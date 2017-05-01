import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

import nodes from '../../data/nodes';
import links from '../../data/links';

import { loadNode } from '../actions/coverage';
import { flattenTree } from '../selectors/coverage';
import { selectionTypes, select, deselect } from '../actions/selection';
import { showSidebar, hideSidebar } from '../actions/layout';
import { selectNode } from '../selectors/coverage';

import ForceGraph from '../components/ForceGraph';
import InteractiveForceGraph from '../components/InteractiveForceGraph';
import ForceGraphNode from '../components/ForceGraphNode';
// import ForceGraphLink from '../components/ForceGraphLink';
import ForceGraphLink from '../components/ForceGraphLink';
import NodeSummary from '../components/NodeSummary';

class Coverage extends Component {
  constructor(props) {
    super(props);

    [
      'handleSelectNode',
      'handleDeselect',
      'renderNodeInfo'
    ].forEach(m => this[m] = this[m].bind(this));
  }

  componentWillMount() {
    this.props.loadNode("root");
  }

  handleSelectNode(e, node) {
    // browserHistory.push("/" + node.address.replace(/\./gi, "/"));
    e.stopPropagation();
    this.props.showSidebar();
    this.props.loadNode(node.id);
    this.props.select(selectionTypes.NODE, node.id);
  }

  handleDeselect(e) {
    this.props.deselect();
    this.props.hideSidebar();
  }

  renderNodeInfo() {
    const {node, layout} = this.props;
    const sidebar = layout.sidebar;

    if (!node) {
      return undefined;
    }

    return (
      <div style={Object.assign({ position: "absolute" }, sidebar)}>
        <NodeSummary node={node} />
      </div>
    );
  }

  render() {
    const { nodes, links, layout, node } = this.props;

    if (nodes.length == 0) {
      return <div></div>
    }

    function nodeForId(id) {
      return nodes.find((n) => n.id === id);
    }

    return (
      <div className="namespace" onClick={this.handleDeselect}>
        <div className="main" style={{ 
          position: "absolute", 
          width : layout.main.w,
          height : layout.main.h,
          top : layout.main.t,
          left : layout.main.l
        }}>
          {/*<hr className="green" />*/}
          <InteractiveForceGraph
            labelOffset={{
              x : ({ radius = 10 }) => 17, 
              y : ({ radius = 10 }) => 6,
            }}
            zoom
            onSelectNode={this.handleSelectNode}
            labelAttr="name"
            selectedNode={ node ? nodeForId(node.id) : undefined }
            simulationOptions={{ height: layout.main.height, width: layout.main.width, animate : true, strength : { linkDistance: 100, charge : -400 } }}>
            {nodes.map((node, i) => {
              return (<ForceGraphNode 
                        key={`node-${i}`} 
                        node={node} 
                        fill={ node.archived ? "#88c21d" : "#212e33"  }
                        labelClass="label" 
                        labelStyle={{ fontSize : 12, fill : "#444" }}
                        style={{ 
                          // opacity : (node.numDescendants && node.numDescendantsArchived) ? (node.numDescendantsArchived / node.numDescendants) : 1 
                        }}
                      />);
            })}
            {links.map((c, i) => {
              return (<ForceGraphLink key={`link-${i}`} link={c} />);
            })}
          </InteractiveForceGraph>
        </div>
        {this.renderNodeInfo()}
      </div>
    );
  }
}

Coverage.propTypes = {
}

Coverage.defaultProps = {
  
}

function mapStateToProps(state, ownProps) {
  const { links, nodes } = flattenTree(state.coverage.tree);

  let node;
  if (state.selection.type == selectionTypes.NODE) {
    node = selectNode(state, state.selection.value);
  }

  return {
    nodes,
    links,
    node,
    layout : state.layout,
  }
}

export default connect(mapStateToProps, {
  loadNode,
  select,
  deselect,
  showSidebar,
  hideSidebar
})(Coverage);