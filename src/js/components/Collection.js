import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import List from './List';

const Collection = ({ collection, items, sessionKeyId, onEdit, onDelete, onArchive }) => {
  // const collection = data;
  return (
    <div id="collection" className="collection page">
      <header className="collection colorized">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <hr className="green" />
              <a className="right" onClick={onDelete}>&nbsp; Delete</a>
              <a className="right" onClick={onEdit}>&nbsp; Edit</a>
              {sessionKeyId && <a className="right red" onClick={onArchive}>&nbsp; Archive</a>}
              <label className="label">Collection</label>
              <h1>{collection.title}</h1>
              <p>{collection.description}</p>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <table className="collection items table">
              <thead>
                <tr>
                  <th>hash</th>
                  <th>url</th>
                  <th>description</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => {
                  return (
                    <tr key={i} className="">
                      {/*<td>{ hash && <Link to={`/content/${hash}`}><h5 className="title">{hash}</h5></Link>}</td>*/}
                      <td>{ item.hash && <a href={`https://ipfs.io/ipfs/${item.hash}`} target="_blank"><p className="title">{item.hash}</p></a>}</td>
                      <td><Link to={`/url?url=${item.url}`}>{item.url}</Link></td>
                      <td>{item.description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

Collection.propTypes = {
  // data: PropTypes.object.isRequired,
  collection: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  sessionKeyId: PropTypes.string,
};

export default Collection;
