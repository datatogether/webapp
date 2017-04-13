import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import ProgressBar from './ProgressBar';

const SourcesRow = ({ data, label }) => {
  const sources = data;
  return (
    <div className="row">
      <div className="col-md-12">
        <hr />
        <label className="label">{label}</label>
      </div>
      {sources.map((source, i) => {
        return (
          <Link key={i} to={`/sources/${source.id}`} className="col-md-4 orange">
            <h4>{source.title}</h4>
            <ProgressBar size="micro" color="orange" total={source.stats.contentUrlCount} progress={source.stats.contentMetadataCount} />
          </Link>
        );
      })}
    </div>
  );
};

SourcesRow.propTypes = {
  data: PropTypes.array.isRequired,
  label: PropTypes.string,
};

SourcesRow.defaultProps = {
  label: "Sources",
};

export default SourcesRow;
