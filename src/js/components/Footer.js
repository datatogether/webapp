/* globals __BUILD__ */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Footer = ({ style }) => {
  return (
    <footer id="footer" style={style}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-6 col-xs-6">
            <Link id="logotype" href={__BUILD__.BASE_URL}>ARCHIVERS 2.0 <span className="red hidden-sm-down">ALPHA</span></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
};

Footer.defaultProps = {
};

export default Footer;
