import React from 'react';
import { Link } from 'react-router';

import ProgressBar from '../ProgressBar';

const SourceItem = ({ data }) => {
  const source = data;

  return (
    <div className="source item col-md-12">
      <Link to={`/sources/${source.id}`} className="orange">
        <h4>{source.url}</h4>
        {/* <small>{source.stats.contentMetadataCount}/{source.stats.contentUrlCount}</small> */}
        <ProgressBar size="micro" color="orange" total={source.stats.contentUrlCount} progress={source.stats.contentMetadataCount} />
      </Link>
    </div>
  );
};

SourceItem.propTypes = {
  data: React.PropTypes.object.isRequired,
  // onSelect: React.PropTypes.func.isRequired,
};

SourceItem.defaultProps = {
};

export default SourceItem;
