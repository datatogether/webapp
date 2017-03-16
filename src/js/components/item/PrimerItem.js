import React from 'react';
import { Link } from 'react-router';

import { concatUrlString } from '../../selectors/url';

const PrimerItem = ({ data }) => {
  const primer = data;

  return (
    <div className="search result item col-md-12">
      <Link to={`/primers/${primer.id}`}>
        { primer.title ? <h5>{primer.title}</h5> : undefined }
      </Link>
    </div>
  );
};

PrimerItem.propTypes = {
  data: React.PropTypes.object.isRequired,
  // onSelect: React.PropTypes.func.isRequired,
};

PrimerItem.defaultProps = {
};

export default PrimerItem;
