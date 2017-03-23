import React, { PropTypes } from 'react';

// Metadata is a static metadata viewer
const Metadata = ({ metadata }) => {
  return (
    <div className="metadata">
      {Object.keys(metadata).map((key) => {
        // TODO - this is a hack for demo purposes. remove when ready.
        // if (key == "subjectHash" || key == "userId" || key == "requestId") {
        //   return <div key={key}></div>;
        // }
        return (
          <div key={key}>
            <label className="yellow meta label">{key}</label>
            <p>{metadata[key]}</p>
          </div>
        );
      })}
    </div>
  );
};

Metadata.propTypes = {
  metadata: PropTypes.object,
};

Metadata.defaultProps = {
};

export default Metadata;

