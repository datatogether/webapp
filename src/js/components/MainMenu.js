import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class MainMenu extends React.Component {
  onClick(e) {
    // need to prevent any clicks on mainmenu from bubbling up
    // & hiding the menu
    e.stopPropagation();
  }

  userLinks(user) {
    if (!user) {
      return <Link to="/login">Login</Link>;
    }

    return (
      <div>
        <Link to={`/user/${user.username}`}>{user.username}</Link>
        <a href="/docs">Docs</a>
      </div>
    );
  }

  render() {
    const { user, show, onGimmieInvite } = this.props;
    return (
      <div id="main_menu" onClick={this.onClick} className={show ? "show" : "hide"}>
        <Link className="blue" to="/">Home</Link>
        <Link className="blue" to="/archives">Archives</Link>
        <Link className="blue" to="/primers">Primers</Link>
        {/*<Link className="blue" to="/collections">Collections</Link>*/}
        {
          !user &&
            (<div>
              <Link className="yellow" to="/login">Login</Link>
              <Link className="yellow" to="/signup">Signup</Link>
            </div>)
        }
        <a className="orange" href="https://docs.archivers.space/archivers">Docs</a>
        <a className="orange" href="https://github.com/edgi-govdata-archiving/proposed-services">Proposal</a>
        <a className="orange" href="https://github.com/qri-io/context/issues">App Issues</a>
      </div>
    );
  }
}

MainMenu.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.null]),
  show: PropTypes.bool,
};

MainMenu.defaultProps = {
};
