import React, { PropTypes } from 'react';

import List from '../List';
import ValidInput from './ValidInput';
import SelectUser from './SelectUser';
// import ValidTextarea from './ValidTextarea';

const CollectionForm = ({ name, data, users, onChange, onCancel, onSubmit }) => {
  const collection = data;
  const handleChange = (name, value) => {
    onChange(name, Object.assign({}, data, { [name] : value }));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(collection, e);
  };

  const handleItemChange = (index, item) => {
    let contents = collection.contents.concat()
    contents.splice(index,1,item);

    onChange(name, Object.assign({}, collection, { contents }));
  }

  const handleItemDelete = (index) => {
    // onChange(name, data);
  }

  const handleAddItem = (e) => {
    e.preventDefault();
    let contents = collection.contents || [];
    onChange(name,Object.assign({}, collection, { contents: contents.concat([["", "", ""]])}));
  }

  return (
    <div id="collection" className="page">
      <div className="container">
        <header className="row">
          <div className="col-md-12">
            <hr className="green" />
            <label className="label">Collection</label>
          </div>
        </header>
        <div className="row">
          <div className="col-md-12">
            <SelectUser name="creator" users={users} value={collection.key} onChange={handleChange} />
            <ValidInput name="title" label="title" value={collection.title} onChange={handleChange} />
            <br />
            <button className="btn" onClick={onCancel}>Cancel</button>
            <input className="btn btn-primary" type="submit" value="Save" onClick={handleSubmit} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <hr className="green" />
            <label className="label">collection items</label>
            <table className="table">
              <thead>
                <tr>
                  <th>hash</th>
                  <th>url</th>
                  <th>description</th>
                  <th>delete</th>
                </tr>
              </thead>
              <tbody>
                {collection.contents.map((item, i) => {
                  return <CollectionItem key={i} data={item} index={i} onChange={handleItemChange} onDelete={handleItemDelete}  />
                })}
              </tbody>
            </table>
            <a onClick={handleAddItem}>add item</a>
          </div>
        </div>
      </div>
    </div>
  );
};

CollectionForm.propTypes = {
  data: PropTypes.object.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

CollectionForm.defaultProps = {
  name : "collection",
}

const CollectionItem = ({data, index, onChange, onDelete}) => {
  const handleChange = (name, value) => {
    // TODO - lol make this not bad
    switch (name) {
      case "url":
        onChange(index, [data[0],value, data[2]])
        break;
      case "note":
        onChange(index, [data[0], data[1], value])
        break;
    }
  }

  const handleDelete = (e) => {
    onDelete(index);
  }

  return (
    <tr>
      <td>{data[0]}</td>
      <td><ValidInput name="url" value={data[1]} onChange={handleChange} /></td>
      <td><ValidInput name="note" value={data[2]} onChange={handleChange} /></td>
      <td><a onClick={handleDelete}>delete</a></td>
    </tr>
  );
}

export default CollectionForm;
