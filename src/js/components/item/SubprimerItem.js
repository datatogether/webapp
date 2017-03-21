import React from 'react';
import { Link } from 'react-router';

import ProgressBar from '../ProgressBar';

const SubprimerItem = ({ data }) => {
  const subprimer = data;

  return (
    <div className="subprimer item col-md-12">
      <Link to={`/subprimers/${subprimer.id}`} className="orange">
        <h4>{subprimer.url}</h4>
        {/* <small>{subprimer.stats.contentMetadataCount}/{subprimer.stats.contentUrlCount}</small> */}
        <ProgressBar size="micro" color="orange" total={subprimer.stats.contentUrlCount} progress={subprimer.stats.contentMetadataCount} />
      </Link>
    </div>
  );
};

SubprimerItem.propTypes = {
  data: React.PropTypes.object.isRequired,
  // onSelect: React.PropTypes.func.isRequired,
};

SubprimerItem.defaultProps = {
};

export default SubprimerItem;
