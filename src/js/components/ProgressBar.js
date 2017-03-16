import React, { PropTypes } from 'react';

const ProgressBar = ({ total, progress, size, color }) => {
  return (
    <div className={`progressbar ${size}`}>
      <div className={`progress bg-${color}`} style={{ width : ((progress / (total || 0.001)) * 100) + "%" }}></div>
    </div>
  );
};

ProgressBar.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  total: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
};

ProgressBar.defaultProps = {
  total: 100,
  progress: 0,
  size: "standard",
  color: "blue",
};


export default ProgressBar;
