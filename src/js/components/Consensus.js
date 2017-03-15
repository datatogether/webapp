import React, { PropTypes } from 'react';

const Consensus = ({ data, onClickKey }) => {
  return (
    <div className="consensus">
      {Object.keys(data).map((key) => {
        return (
          <div key={key}>
            <label className="key" onClick={onClickKey}>{key}</label>
            <p>{data[key][0]}</p>
          </div>
        );
      })}
    </div>
  );
};

Consensus.propTypes = {
  data: PropTypes.object.isRequired,
  onClickKey: PropTypes.func,
};

Consensus.defaultProps = {
  onClickKey: () => {},
};


export default Consensus;
