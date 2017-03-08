import React from 'react';
import { Link } from 'react-router';

const SearchResultItem = ({ data, onSelect }) => {
  const uri = encodeURIComponent(data.url);
  return (
    <div className="user item col-xl-3 col-lg-4 col-md-6 col-sm-12" onClick={onSelect}>
      <Link to={`/url?url=${uri}`}>{data.url}</Link>
      <small>{data.hash}</small>
    </div>
  );
}

SearchResultItem.propTypes = {
  data: React.PropTypes.object.isRequired,
  onSelect: React.PropTypes.func.isRequired,
}

SearchResultItem.defaultProps = {
}

export default SearchResultItem;
