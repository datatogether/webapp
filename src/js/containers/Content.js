import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Consensus from '../components/Consensus';
import HistoryItem from '../components/item/HistoryItem';
import List from '../components/List';
// import Metadata from '../components/Metadata';
import TabBar from '../components/TabBar';
import UrlItem from '../components/item/UrlItem';

import MetadataEditor from './MetadataEditor';

import { loadConsensus } from '../actions/consensus';
import { loadContentMetadata, loadContentUrls } from '../actions/content';
import { selectConsensus } from '../selectors/consensus';
import { selectContentUrls, selectContentMetadata } from '../selectors/content';

class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: "metadata",
    };

    [
      "handleSetTab",
    ].forEach((m) => { this[m] = this[m].bind(this); });
  }

  componentWillMount() {
    // this.props.loadUserByUsername(this.props.username);
    // Debounce search to avoid hammering the server with relentless queries
    // 250ms delay should be enough
    // this.props.search = debounce(this.props.search, 250);
  }

  componentWillReceiveProps() {
    // if (nextProps.username != this.props.username) {
    //   nextProps.loadUserByUsername(nextProps.username)
    // }
  }

  handleSetTab(tab) {
    const { hash } = this.props;
    switch (tab) {
      case "consensus":
        this.props.loadConsensus(hash);
        break;
      case "metadata":
        this.props.loadContentMetadata(hash);
        break;
      case "urls":
        this.props.loadContentUrls(hash);
        break;
      case "history":
        break;
      default:
        break;
    }
    this.setState({ tab });
  }

  renderCurrentTab() {
    const { tab } = this.state;
    switch (tab) {
      case "consensus":
        return <Consensus data={this.props.consensus ? this.props.consensus.data : {}} />;
      case "metadata":
        return <MetadataEditor subjectHash={this.props.hash} />;
      case "urls":
        return <List data={this.props.urls} component={UrlItem} />;
      case "history":
        return <List data={this.props.history} component={HistoryItem} />;
      default:
        return undefined;
    }
  }

  render() {
    const { hash } = this.props;
    const { tab } = this.state;

    return (
      <div id="content" className="page">
        <div className="container">
          <div className="row">
            <header className="yellow col-md-12">
              <hr className="yellow" />
              <label className="label">Content</label>
              <h5>{hash}</h5>
            </header>
          </div>
          <TabBar value={tab} tabs={["consensus", "metadata", "urls", "history"]} onChange={this.handleSetTab} color="yellow" />
          {this.renderCurrentTab()}
        </div>
      </div>
    );
  }
}

Content.propTypes = {
  hash: PropTypes.string.isRequired,

  consensus: PropTypes.object,
  // metadata: PropTypes.array,
  urls: PropTypes.array,
  history: PropTypes.array,

  loadContentUrls: PropTypes.func.isRequired,
  loadContentMetadata: PropTypes.func.isRequired,
  loadConsensus: PropTypes.func.isRequired,
};

Content.defaultProps = {
};

function mapStateToProps(state, ownProps) {
  const hash = ownProps.params.hash;

  return Object.assign({
    hash,
    urls: selectContentUrls(state, hash),
    consensus: selectConsensus(state, hash),
    metadata: selectContentMetadata(state, hash),
  }, ownProps);
}

export default connect(mapStateToProps, {
  loadConsensus,
  loadContentMetadata,
  loadContentUrls,
})(Content);
