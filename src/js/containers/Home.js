import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
// import { debounce } from 'lodash';

import { search } from '../actions/search';
import { loadUserByUsername } from '../actions/user';
import { archiveUrl } from '../actions/url';
import { selectSessionUser } from '../selectors/session';
import { selectSearchQuery, selectSearchResults } from '../selectors/search';

import List from '../components/List';
import SearchResultItem from '../components/item/SearchResultItem';

class Home extends React.Component {
  constructor(props) {
    super(props);

    [
      "handleSearchChange",
      "handleArchiveUrl",
    ].forEach((m) => { this[m] = this[m].bind(this); });
  }

  handleSearchChange(e) {
    this.props.search(e.target.value);
  }

  handleArchiveUrl(url) {
    this.props.archiveUrl(url).then(() => {
      browserHistory.push(`/url?url=${url}`);
    });
  }

  renderArchiveUrl() {
    const { query, results } = this.props;
    if (query && query.length > 4 && !results.length) {
      return (
        <div className="row">
          <div className="col-md-12">
            <h6>Hrm... looks like we don&apos;t have a record for that url.</h6>
            <p>Would You Like to try to archive it?</p>
            <button className="btn btn-primary" onClick={this.handleArchiveUrl.bind(this, query)}>Archive Url</button>
          </div>
        </div>
      );
    }

    return undefined;
  }

  render() {
    const { query, results } = this.props;

    return (
      <div id="home" className="page">
        <div className="user container">
          <div className="row">
            <header className="yellow col-md-12">
              <hr className="yellow" />
              <div className="form-group">
                <label className="form-label">search:</label>
                <input className="form-control" value={query} onChange={this.handleSearchChange} />
              </div>
            </header>
          </div>
          <div className="row">
            <List component={SearchResultItem} data={results} />
          </div>
          {this.renderArchiveUrl()}
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
