import React, { PropTypes } from 'react';

import ValidInput from './ValidInput';
import ValidTextarea from './ValidTextarea';

const CollectionForm = ({ collection, onChange, onCancel, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(collection, e);
  };

  return (
    <div className="collection row">
      <div className="col-md-12">
        <ValidInput name="title" value={collection.title} onChange={onChange} />
        <br />
        <button className="btn" onClick={onCancel}>Cancel</button>
        <input className="btn btn-primary" type="submit" value="Save" onClick={handleSubmit} />
      </div>
    </div>
  );
};

CollectionForm.propTypes = {
  collection: PropTypes.object.isRequired,

  onChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CollectionForm;
