import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
// import { debounce } from 'lodash';

import analytics from '../analytics';
import { search } from '../actions/search';
import { loadUserByUsername } from '../actions/user';
import { archiveUrl } from '../actions/url';
import { selectSessionUser } from '../selectors/session';
import { selectSearchQuery, selectSearchResults } from '../selectors/search';

import Footer from '../components/Footer';

class Home extends React.Component {
  constructor(props) {
    super(props);

    [
      "handleSearchChange",
      "handleArchiveUrl",
    ].forEach((m) => { this[m] = this[m].bind(this); });
  }

  componentWillMount() {
    analytics.page("home");
  }

  handleSearchChange(e) {
    this.props.search(e.target.value);
  }

  handleArchiveUrl(url) {
    this.props.archiveUrl(url).then(() => {
      browserHistory.push(`/url?url=${url}`);
    });
  }

  render() {
    const { session } = this.props;

    return (
      <div id="home" className="page">
        <div className="masthead">
          <img className="left-lines" src="https://s3.amazonaws.com/datatogether/svg/lines_left.svg" />
          <h1 className="tagline">Data Together is Public Knowledge<br/>Held by Communities</h1>
          <img className="right-lines" src="https://s3.amazonaws.com/datatogether/svg/lines_right.svg" />
          <div className="clear"></div>
        </div>
        <div className="signup container">
          <div className="row">
            <div className="text col-md-6">
              <p>The Data Together project is a new model for distributed, community-driven stewardship of data Access, Discovery, Verification, and Preservation. We hope to build a future in which data is accessible to all, immediately discoverable, easily verifiable, and robustly preserved. We’re building tools that built on decentralized principles to empower communities to help make this vision a reality.</p>
              <Link to={session ? "/primers" : "/signup"} className="btn btn-large bg-red white">Get Started</Link>
            </div>
            <div className="image col-md-4 offset-md-2">
              <img src="https://s3.us-east-2.amazonaws.com/static.archivers.space/add-metadata.png" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Home.propTypes = {
  // pages: PropTypes.object.isRequired,
  search: PropTypes.func.isRequired,
};

Home.defaultProps = {
};

function mapStateToProps(state, ownProps) {
  const session = selectSessionUser(state);
  return Object.assign({
    session,
    query: selectSearchQuery(state),
    results: selectSearchResults(state),
  }, ownProps);
}

export default connect(mapStateToProps, {
  loadUserByUsername,
  archiveUrl,
  search,
})(Home);
