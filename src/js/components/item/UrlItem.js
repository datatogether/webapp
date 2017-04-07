import React from 'react';
import { Link } from 'react-router';

import { concatUrlString } from '../../selectors/url';

const UrlItem = ({ data }) => {
  const url = data;
  const uri = encodeURIComponent(url.url);

  const urlState = (state) => {
    if (state) {
      return <p>{url.state.loading ? "loading" : ""} {url.state.success ? "success!" : ""} {url.state.error ? url.state.error : "" }</p>;
    }
    return undefined;
  };

  return (
    <div className="search result item col-md-12">
      <Link className="blue" to={`/url?url=${uri}`}>
        { url.title ? <h5>{url.title}</h5> : undefined }
        {concatUrlString(url.url)}
      </Link>
      <p>{ url.contentSniff && url.contentSniff != "text/html; charset=utf-8" ? <Link className="yellow" to={`/content/${url.hash}`}>{url.fileName || url.hash}</Link> : undefined }</p>
      {urlState(url.state)}
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
