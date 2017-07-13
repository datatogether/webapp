import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import List from './List';

const Collection = ({ data, sessionKeyId, onEdit, onDelete, onArchive }) => {
  const collection = data;
  return (
    <div id="collection" className="page">
      <div className="container">
        <header className="row">
          <div className="col-md-12">
            <hr className="green" />
            <a className="right red" onClick={onDelete}>&nbsp; Delete</a>
            <a className="right" onClick={onEdit}>&nbsp; Edit</a>
            {sessionKeyId && <a className="right red" onClick={onArchive}>&nbsp; Archive</a>}
            <label className="label">Collection</label>
            <h1 className="green">{collection.title}</h1>
          </div>
        </header>
        <div className="row">
          <div className="col-md-12 col-lg-8">
            <p>{collection.description}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <table className="table">
              <thead>
                <tr>
                  <th>hash</th>
                  <th>url</th>
                  <th>description</th>
                </tr>
              </thead>
              <tbody>
                {collection.contents.map((data, i) => {
                  const hash = data[0];
                  const url = data[1];
                  const description = data[2];

                  return (
                    <tr key={i} className="">
                      {/*<td>{ hash && <Link to={`/content/${hash}`}><h5 className="title">{hash}</h5></Link>}</td>*/}
                      <td>{ hash && <a href={`https://ipfs.io/ipfs/${hash}`} target="_blank"><p className="title">{hash}</p></a>}</td>
                      <td>{url}</td>
                      <td>{description}</td>
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
  data: PropTypes.object.isRequired,
  sessionKeyId: PropTypes.string,
};

export default Collection;
