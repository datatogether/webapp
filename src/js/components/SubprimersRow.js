import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import ProgressBar from './ProgressBar';

const SubprimersRow = ({ data, label }) => {
  const subprimers = data;
  return (
    <div className="row">
      <div className="col-md-12">
        <hr />
        <label className="label">{label}</label>
      </div>
      {subprimers.map((subprimer, i) => {
        return (
          <Link key={i} to={`/subprimers/${subprimer.id}`} className="col-md-4 orange">
            <h4>{subprimer.url}</h4>
            <ProgressBar size="micro" color="orange" total={subprimer.stats.contentUrlCount} progress={subprimer.stats.contentMetadataCount} />
          </Link>
        );
      })}
    </div>
  );
};

SubprimersRow.propTypes = {
  data: PropTypes.array.isRequired,
  label: PropTypes.string,
};

SubprimersRow.defaultProps = {
  label: "Subprimers",
};

export default SubprimersRow;
