import React, { PropTypes } from 'react';

const ProgressBar = ({ total, progress, size }) => {
  const width = ((progress / (total || 0.001)) * 100);
  return (
    <div className={`progressbar ${size}`}>
      <div className={`progress`} style={{ width: `${width}%` }}></div>
    </div>
  );
};

ProgressBar.propTypes = {
  size: PropTypes.string,
  total: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
};

ProgressBar.defaultProps = {
  total: 100,
  progress: 0,
  size: "standard",
};


export default ProgressBar;
