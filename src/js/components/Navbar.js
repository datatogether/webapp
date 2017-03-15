/* globals __BUILD__ */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Navbar = ({ user, onGimmieInvite, style }) => {
  return (
    <div id="navbar" style={style}>
      <div className="container">
        <div className="row">
          <Link id="logotype" className="col-md-3 col-sm-4" href={__BUILD__.BASE_URL}>ARCHIVERS 2.0 <span className="blue">BETA</span></Link>
          <div className="menu col-md-4 offset-md-5">
            <a className="blue" target="_blank" rel="noopener noreferrer" href="http://github.com/qri-io/context/issues">Issues</a>
            <Link to="/">Search</Link>
            <Link to="/primers">Primers</Link>
            {
              user ?
                <Link to={`/users/${user.username}`}>{user.username}</Link> :
                <a onClick={onGimmieInvite}>Gimmie beta</a>
            }
            { user ? undefined : <Link to="/login">Login</Link>}
          </div>
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  user: PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.null]),
  // onToggleMenu: PropTypes.func.isRequired,
  onGimmieInvite: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
};

export default Navbar;
