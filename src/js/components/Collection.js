import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import List from './List';
import ContentItem from './item/ContentItem';

const Collection = ({ data, sessionKeyId }) => {
  const collection = data;
  return (
    <div id="collection" className="page">
      <div className="container">
        <header className="row">
          <div className="col-md-12">
            <hr className="green" />
            <label className="label">Collection</label>
            <h1 className="green">{collection.title}</h1>
          </div>
        </header>
        <div className="row">
          <div className="col-md-12 col-lg-8">
            <p>{collection.description}</p>
          </div>
          {sessionKeyId ? <Link to="/collections/new">New Collection</Link> : undefined}
        </div>
        <div className="row">
          <div className="col-md-12">
            <hr className="green" />
            <h3 className="green">Contents:</h3>
            <br />
          </div>
        </div>
        <div className="row">
          <List data={collection.contents} component={ContentItem} />
        </div>
      </div>
    </div>
  );
};

Collection.propTypes = {
  data: PropTypes.object.isRequired,
  sessionKeyId: PropTypes.string,
};

export default Collection;
