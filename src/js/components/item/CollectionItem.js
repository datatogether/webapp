import React from 'react';
import { Link } from 'react-router';

const CollectionItem = ({ data }) => {
  const collection = data;
  return (
    <div className="collection item col-md-12">
      <Link className="yellow" to={`/collections/${collection.id}`}>{collection.title}</Link>
    </div>
  );
};

CollectionItem.propTypes = {
  data: React.PropTypes.object.isRequired,
  // onSelect: React.PropTypes.func.isRequired,
};

CollectionItem.defaultProps = {
};

export default CollectionItem;
