import React, { PropTypes } from 'react';

const ProgressBar = ({ total, progress }) => {
  return (
    <div className="progressbar">
      <div className="progress" style={{ width : (progress / (total || 0.1)) + "%" }}></div>
    </div>
  );
};

ProgressBar.propTypes = {
  total: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
};

ProgressBar.defaultProps = {
  total: 100,
  progress: 0,
};


export default ProgressBar;
