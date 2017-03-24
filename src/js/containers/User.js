import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { loadUserByUsername } from '../actions/user';
import { logoutUser, loadKeys } from '../actions/session';
import { loadMetadataByKey } from '../actions/metadata';

import { selectSessionUser } from '../selectors/session';
import { selectUserByUsername } from '../selectors/user';
import { selectMetadataByKey } from '../selectors/metadata';
import { selectDefaultKeyId } from '../selectors/keys';

import NotFound from '../components/NotFound';
import List from '../components/List';
import MetadataItem from '../components/item/MetadataItem';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: !this.props.user,
    };

    [
      "handleLogout",
    ].forEach((m) => { this[m] = this[m].bind(this); });
  }

  componentWillMount() {
    if (this.props.user && this.props.user.currentKey) {
      this.props.loadMetadataByKey(this.props.user.currentKey);
    } else {
      this.props.loadUserByUsername(this.props.username);
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.user, this.state.loading);
    if (nextProps.username != this.props.username) {
      nextProps.loadUserByUsername(nextProps.username);
      this.setState({ loading : true });
    } else if (nextProps.user && this.state.loading) {
      console.log("huh?");
      if (nextProps.user && nextProps.user.currentKey) {
        this.props.loadMetadataByKey(nextProps.user.currentKey);
      }
      this.setState({ loading: false });
    }
  }

  handleLogout() {
    this.props.logoutUser();
  }

  render() {
    const { user, permissions, metadata } = this.props;
    if (!user) {
      return <NotFound />;
    }

    return (
      <div id="user" className="page">
        <div className="container">
          <div className="row">
            <header className="red col-md-12">
              <hr className="red" />
              <h1><Link className="red" to={`/${user.username}`}>{user.username}</Link></h1>
              { permissions.edit ? <Link to="/settings" >settings </Link> : undefined }
              { permissions.edit ? <a onClick={this.handleLogout}>logout</a> : undefined }
              <p>{ user.description }</p>
            </header>
          </div>
          <div className="row">
            <div className="col-md-12">
              <hr className="red" />
              <h4>Metadata:</h4>
            </div>
            <List data={metadata} component={MetadataItem} />
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
    metadata: user ? selectMetadataByKey(state, user.currentKey) : [],
  }, ownProps);
}

export default connect(mapStateToProps, {
  loadUserByUsername,
  logoutUser,
  loadKeys,
  loadMetadataByKey,
})(User);
