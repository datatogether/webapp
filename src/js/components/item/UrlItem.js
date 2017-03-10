import React from 'react';
import { Link } from 'react-router';

const UrlItem = ({ data }) => {
  const uri = encodeURIComponent(data.url);
  const concatUrl = (u, max = 80) => {
    return (u.length < max) ? u : `${u.slice(0, max)}...`;
  };

  return (
    <div className="search result item col-md-12">
      <Link to={`/url?url=${uri}`}>
        { data.title ? <h5>{data.title}</h5> : undefined }
        {concatUrl(data.url)}
      </Link>
    </div>
  );
};

UrlItem.propTypes = {
  data: React.PropTypes.object.isRequired,
  // onSelect: React.PropTypes.func.isRequired,
};

UrlItem.defaultProps = {
};

export default UrlItem;
