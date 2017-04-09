import React from 'react';
import { Link } from 'react-router';

import ProgressBar from '../ProgressBar';

const SourceItem = ({ data }) => {
  const source = data;

  return (
    <div className="source item col-md-3">
      <div className="card">
        <Link to={`/sources/${source.id}`} className="orange">
          <header className="bg-blue">
            <h4>{source.title}</h4>
          </header>
          <div className="info">
            <ProgressBar size="micro" color="blue" total={source.stats.contentUrlCount} progress={source.stats.contentMetadataCount} />
            <i>{source.stats.contentMetadataCount}/{source.stats.contentUrlCount}</i>
          </div>
        </Link>
      </div>
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
