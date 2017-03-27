import React, { PropTypes } from 'react';

import ValidInput from './ValidInput';
// import ValidTextarea from './ValidTextarea';

const CollectionForm = ({ data, onChange, onCancel, onSubmit }) => {
  const collection = data;
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(collection, e);
  };

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
            <ValidInput name="title" value={collection.title} onChange={onChange} />
            <br />
            <button className="btn" onClick={onCancel}>Cancel</button>
            <input className="btn btn-primary" type="submit" value="Save" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

CollectionForm.propTypes = {
  data: PropTypes.object.isRequired,

  onChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CollectionForm;
