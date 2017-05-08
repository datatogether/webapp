import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

import { loadNode, toggleNode } from '../actions/coverage';
import { flattenTree,  completionColor, searchTree} from '../selectors/coverage';
import { selectionTypes, select, deselect } from '../actions/selection';
import { showSidebar, hideSidebar } from '../actions/layout';
import { selectNode } from '../selectors/coverage';

// import ForceGraph from '../components/ForceGraph';
// import InteractiveForceGraph from '../components/InteractiveForceGraph';
// import ForceGraphNode from '../components/ForceGraphNode';
// import ForceGraphLink from '../components/ForceGraphLink';
// import ForceGraphLink from '../components/ForceGraphLink';
import NodeSummary from '../components/NodeSummary';
import TreeGraph from '../components/TreeGraph';
import ValidInput from '../components/form/ValidInput';

class Coverage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      selectedPath: "",
    };

    [
      'handleSelectNode',
      'handleDeselect',
      'handleSearchChange',
    ].forEach(m => this[m] = this[m].bind(this));
  }

  componentWillMount() {
    this.props.loadNode("root");
    this.props.showSidebar();
  }

  handleSelectNode(e, node) {
    e.stopPropagation();

    if (this.props.selectedNode && this.props.selectedNode.id == node.data.id) {
      this.props.toggleNode(node.data.id);
      this.props.deselect();
    } else {
      this.props.loadNode(node.data.id);
      this.props.select(selectionTypes.NODE, node.data.id);
      
      let n = node;
      let path = "";
      let selectedNodes = [n];
      while (n.parent) {
        path = (n.parent.parent != null) ? `${n.data.name}/${path}` : `${n.data.name}://${path}`;
        selectedNodes.unshift(n);
        n = n.parent;
      }
      selectedNodes.unshift(n);
      this.setState({ path, selectedNodes });
    }
  }

  handleSearchChange(name, value) {
    this.setState({ query: value, path: "", selectedNodes: undefined });
    this.props.deselect();
  }

  handleDeselect(e) {
    this.props.deselect();
  }

  renderSidebar() {
    const {selectedNode, layout} = this.props;
    const sidebar = layout.sidebar;

    return (
      <div style={Object.assign({ position: "absolute" }, sidebar)} className="container">
        <br />
        <ValidInput name="search" onChange={this.handleSearchChange} value={this.state.query} type="text" placeholder="search" />
        <NodeSummary path={this.state.path} node={selectedNode} />
      </div>
    );
  }

  render() {
    const { nodes, links, layout, selectedNode, tree } = this.props;

    let t = this.state.query ? searchTree(tree, this.state.query) : tree;

    // if (!t) {
    //   return <div></div>
    // }

    function nodeForId(id) {
      return nodes.find((n) => n.id === id);
    }

    return (
      <div className="coverage" onClick={this.handleDeselect}>
        <div className="main" style={{ 
          position: "absolute", 
          width: layout.main.width,
          height: layout.main.height,
          top: layout.main.top,
          left: layout.main.left,
          overflow: 'auto',
        }}>
          {/*<hr className="green" />*/}
          {/*<InteractiveForceGraph
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
          </InteractiveForceGraph>*/}
          <TreeGraph
            data={t}
            layout={layout.main}
            selectedNodes={this.state.selectedNodes}
            onSelectNode={this.handleSelectNode}
            colorNode={completionColor}
          />
        </div>
        {this.renderSidebar()}
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

  let selectedNode;
  if (state.selection.type == selectionTypes.NODE) {
    selectedNode = selectNode(state, state.selection.value);
  }

  return {
    tree: state.coverage.tree,
    nodes,
    links,
    selectedNode,
    layout : state.layout,
  }
}

export default connect(mapStateToProps, {
  loadNode,
  toggleNode,
  select,
  deselect,
  showSidebar,
  hideSidebar
})(Coverage);