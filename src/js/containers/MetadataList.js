import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router';

import { search } from '../actions/search';
import { loadUserByUsername } from '../actions/user';
import { selectSessionUser } from '../selectors/session';
// import { selectUserByUsername } from '../selectors/user';

class MetadataList extends React.Component {
  constructor(props) {
    super(props);

    // [
    //   "handleSearchChange",
    // ].forEach((m) => { this[m] = this[m].bind(this); });
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

  render() {
    const { query, results } = this.props;

    return (
      <div id="content" className="container">
        <div className="row">
          <header className="yellow col-md-12">
            <hr className="yellow" />
          </header>
        </div>
        <div className="row">
        </div>
      </div>
    );
  }
}

MetadataList.propTypes = {
  // pages: PropTypes.object.isRequired,
};

MetadataList.defaultProps = {
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
})(MetadataList);
