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
        <div className="container">
          <div className="row">
            <header className="orange col-md-8 offset-md-2">
              <h1>Welcome!</h1>
            </header>
          </div>
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <p>We&apos;re on a mission to discover, backup, and catalogue <i>lots &amp; lots of government data</i>, and we need your help!
              A large amount the data we discover doesn&apos;t have proper metadata, and isn&apos;t very organized.
              With your help we can build an archive that will last for years to come.
              Join us & help rescue data!</p>
              <Link to={session ? "/archives" : "/signup"} className="btn btn-large bg-orange white">Start Archiving Now</Link>
            </div>
          </div>
        </div>
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
