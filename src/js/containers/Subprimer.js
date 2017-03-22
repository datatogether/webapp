import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { selectSubprimer, selectSubprimerUndescribedUrls, selectSubprimerAttributedUrls } from '../selectors/subprimers';
import { loadSubprimer, loadSubprimerUrls, loadSubprimerAttributedUrls } from '../actions/subprimer';

import List from '../components/List';
import ProgressBar from '../components/ProgressBar';
import Spinner from '../components/Spinner';
import StatsBar from '../components/StatsBar';
import TabBar from '../components/TabBar';
import UrlItem from '../components/item/UrlItem';

class Subprimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: (props.subprimer == undefined),
      tab: 'unattributed content',
    };

    [
      "handleChangeTab",
    ].forEach((m) => { this[m] = this[m].bind(this); });
  }

  componentWillMount() {
    this.props.loadSubprimer(this.props.id);
    this.props.loadSubprimerUrls(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.subprimer && this.state.loading) {
      this.setState({ loading: false });
    }
  }

  handleChangeTab(tab) {
    switch (tab) {
      case "unattributed content":
        this.props.loadSubprimerUrls(this.props.id);
        break;
      case "attributed content":
        this.props.loadSubprimerAttributedUrls(this.props.id);
        break;
      default:
        break;
    }
    this.setState({ tab });
  }

  renderCurrentTab() {
    const { tab } = this.state;
    const { urls, attributedUrls } = this.props;


    switch (tab) {
      case "unattributed content":
        return (
          <div className="row">
            <div className="col-md-12">
              <h4 className="orange">Content Needing Metadata:</h4>
            </div>
            <List data={urls} component={UrlItem} />
          </div>);
      case "attributed content":
        return (
          <div className="row">
            <div className="col-md-12">
              <h4 className="orange">Content With Metadata:</h4>
            </div>
            <List data={attributedUrls} component={UrlItem} />
          </div>);
      default:
        return undefined;
    }
  }

  render() {
    const { loading, tab } = this.state;
    const { subprimer } = this.props;

    if (loading) {
      return <Spinner />;
    }

    return (
      <div id="subprimers" className="page">
        <div className="container">
          <header className="row">
            <div className="col-md-12">
              <hr className="orange" />
              <label className="label">Subprimer</label>
              <h1 className="orange">{subprimer.url}</h1>
            </div>
          </header>
          <div className="row">
            <div className="col-md-12">
              <ProgressBar total={subprimer.stats.contentUrlCount} progress={subprimer.stats.contentMetadataCount} color="orange" />
              <StatsBar
                stats={{
                  urls: subprimer.stats.urlCount,
                  content: subprimer.stats.contentUrlCount,
                  documented: subprimer.stats.contentMetadataCount,
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <TabBar value={tab} tabs={["unattributed content", "attributed content"]} onChange={this.handleChangeTab} color="orange" />
            </div>
          </div>
          {this.renderCurrentTab()}
        </div>
      </div>
    );
  }
}

Subprimer.propTypes = {
  id: PropTypes.string.isRequired,
  subprimer: PropTypes.object,

  urls: PropTypes.array.isRequired,
  attributedUrls: PropTypes.array.isRequired,

  loadSubprimer: PropTypes.func.isRequired,
  loadSubprimerUrls: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.params.id,
    subprimer: selectSubprimer(state, ownProps.params.id),

    urls: selectSubprimerUndescribedUrls(state, ownProps.params.id),
    attributedUrls: selectSubprimerAttributedUrls(state, ownProps.params.id),
  };
}

export default connect(mapStateToProps, {
  loadSubprimer,
  loadSubprimerUrls,
  loadSubprimerAttributedUrls,
})(Subprimer);
