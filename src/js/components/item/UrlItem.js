import React from 'react';
import { Link } from 'react-router';

const UrlItem = ({ data }) => {
  const url = data;
  const uri = encodeURIComponent(url.url);
  const concatUrl = (u, max = 80) => {
    return (u.length < max) ? u : `${u.slice(0, max)}...`;
  };
  const urlState = (state) => {
    if (state) {
      return <p>{url.state.loading ? "loading" : ""} {url.state.success ? "success!" : ""} {url.state.error ? url.state.error : "" }</p>
    }
    return undefined;
  }

  return (
    <div className="search result item col-md-12">
      <Link to={`/url?url=${uri}`}>
        { url.title ? <h5>{url.title}</h5> : undefined }
        {concatUrl(url.url)}
      </Link>
      <p>{ url.contentSniff && url.contentSniff != "text/html; charset=utf-8" ? <Link to={`/content/${url.hash}`}>{url.hash}</Link> : undefined }</p>
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
