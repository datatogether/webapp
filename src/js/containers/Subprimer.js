import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { selectSubprimer, selectSubprimerUndescribedUrls } from '../selectors/subprimers';
import { loadSubprimer, loadSubprimerUrls } from '../actions/subprimer';

import List from '../components/List';
import ProgressBar from '../components/ProgressBar';
import Spinner from '../components/Spinner';
import StatsBar from '../components/StatsBar';
import UrlItem from '../components/item/UrlItem';

class Subprimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: (props.subprimer == undefined),
    };

    [].forEach((m) => { this[m] = this[m].bind(this); });
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
  
  render() {
    const { loading } = this.state;
    const { subprimer, urls } = this.props;

    if (loading) {
      return <Spinner />;
    }

    return (
      <div id="subprimers" className="page">
        <div className="container">
          <header className="row">
            <div className="col-md-12">
              <hr className="yellow" />
              <label>Subprimer</label>
              <h1 className="yellow">{subprimer.url}</h1>
            </div>
          </header>
          <div className="row">
            <div className="col-md-12">
              <ProgressBar total={subprimer.stats.contentUrlCount} progress={subprimer.stats.contentMetadataCount} color="yellow" />
              <StatsBar stats={{ 
                "urls": subprimer.stats.urlCount,
                "content": subprimer.stats.contentUrlCount,
                "documented": subprimer.stats.contentMetadataCount,
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <hr className="green" />
              <h4 className="green">Content Needing Metadata:</h4>
            </div>
          </div>
          <div className="row">
            <List data={urls} component={UrlItem} />
          </div>
        </div>
      </div>
    );
  }
}

Subprimer.propTypes = {
  id : PropTypes.string.isRequired,
  subprimer: PropTypes.object,
  urls: PropTypes.array.isRequired,
  loadSubprimer: PropTypes.func.isRequired,
  loadSubprimerUrls: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    id : ownProps.params.id,
    subprimer: selectSubprimer(state, ownProps.params.id),
    urls: selectSubprimerUndescribedUrls(state, ownProps.params.id),
  };
}

export default connect(mapStateToProps, {
  loadSubprimer,
  loadSubprimerUrls,
})(Subprimer);
