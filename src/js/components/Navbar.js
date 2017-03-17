/* globals __BUILD__ */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Navbar = ({ user, style }) => {
  return (
    <div id="navbar" style={style}>
      <div className="container">
        <div className="row">
          <Link id="logotype" className="col-md-6 col-sm-6" href={__BUILD__.BASE_URL}>ARCHIVERS 2.0 <span className="red">ALPHA</span></Link>
          <div className="menu col-md-4 offset-md-2 col-sm-6">
            <a className="blue" target="_blank" rel="noopener noreferrer" href="http://github.com/qri-io/context/issues">Issues</a>
            <Link to="/">Search</Link>
            <Link to="/primers">Primers</Link>
            {
              user ?
                <Link to={`/users/${user.username}`}>{user.username}</Link> :
                <Link to="/login">Login</Link>
            }
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
};

Navbar.defaultProps = {
};

export default Navbar;
