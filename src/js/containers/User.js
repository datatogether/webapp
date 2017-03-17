import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { loadUserByUsername } from '../actions/user';
import { logoutUser } from '../actions/session';
import { selectSessionUser } from '../selectors/session';
import { selectUserByUsername } from '../selectors/user';

import NotFound from '../components/NotFound';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: !!this.props.user,
    };

    [
      "handleLogout",
    ].forEach((m) => { this[m] = this[m].bind(this); });
  }

  componentWillMount() {
    this.props.loadUserByUsername(this.props.username);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.username != this.props.username) {
      nextProps.loadUserByUsername(nextProps.username);
    } else if (nextProps.user && this.state.loading) {
      this.setState({ loading: false });
    }
  }

  handleLogout() {
    this.props.logoutUser();
  }

  render() {
    const { user, permissions } = this.props;
    if (!user) {
      return <NotFound />;
    }

    return (
      <div id="user" className="page">
        <div className="container">
          <div className="row">
            <header className="yellow col-md-12">
              <hr className="yellow" />
              <h1><Link className="yellow" to={`/${user.username}`}>{user.username}</Link></h1>
              { permissions.edit ? <Link to="/settings" >settings </Link> : undefined }
              { permissions.edit ? <a onClick={this.handleLogout}>logout</a> : undefined }
              <p>{ user.description }</p>
            </header>
          </div>
        </div>
      </div>
    );
  }
}

User.propTypes = {
  username: PropTypes.string.isRequired,
  user: PropTypes.object,
  permissions: PropTypes.object.isRequired,
  loadUserByUsername: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

User.defaultProps = {
};

function mapStateToProps(state, ownProps) {
  const username = ownProps.params.user;
  const user = selectUserByUsername(state, username);
  let permissions = {
    edit: false,
    del: false,
  };

  const session = selectSessionUser(state);
  if (session && session.username == username) {
    permissions.edit = true;
    permissions.del = true;
  }

  return Object.assign({
    username,
    user,
    permissions,
  }, ownProps);
}

export default connect(mapStateToProps, {
  loadUserByUsername,
  logoutUser,
})(User);
