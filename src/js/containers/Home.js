import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { debounce } from 'lodash';

import { search } from '../actions/search';
import { loadUserByUsername } from '../actions/user';
import { selectSessionUser } from '../selectors/session';
import { selectUserByUsername } from '../selectors/user';
import { selectSearchQuery, selectSearchResults } from '../selectors/search';

import List from '../components/List';
import SearchResultItem from '../components/item/SearchResultItem';

class Home extends React.Component {
  constructor(props) {
    super(props);

    [
      "handleSearchChange",
    ].forEach(m => this[m] = this[m].bind(this));
  }

  componentWillMount() {
    // this.props.loadUserByUsername(this.props.username);

    // Debounce search to avoid hammering the server with relentless queries
    // 250ms delay should be enough
    // this.props.search = debounce(this.props.search, 250);
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.username != this.props.username) {
    //   nextProps.loadUserByUsername(nextProps.username)
    // }
  }

  handleSearchChange(e) {
    this.props.search(e.target.value);
  }

  render() {
    const { username, user, datasets, queries, permissions, roles, query, results } = this.props;

    return (
      <div id="home" className="user container">
        <div className="row">
          <header className="yellow col-md-12">
            <hr className="yellow" />
            <input value={query} onChange={this.handleSearchChange} />
          </header>
        </div>
        <div className="row">
          <List component={SearchResultItem} data={results} />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  // pages: PropTypes.object.isRequired,
  search: PropTypes.func.isRequired,
  loadUserByUsername: PropTypes.func.isRequired,
};

Home.defaultProps = {
};

function mapStateToProps(state, ownProps) {
  const session = selectSessionUser(state);
  return Object.assign({
    session,
    query : selectSearchQuery(state),
    results : selectSearchResults(state),
  }, ownProps)
}

export default connect(mapStateToProps, {
  loadUserByUsername,
  search,
})(Home);
