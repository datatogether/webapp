import React, { PropTypes } from 'react';

import ValidInput from './ValidInput';
import ValidTextarea from './ValidTextarea';

const MetadataForm = ({ metadata, onChange, onCancel, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(metadata, e);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onCancel(e);
  }

  return (
    <form className="metadata row" onSubmit={handleSubmit}>
      <div className="col-md-12">
        <ValidInput name="title" label="title" value={metadata.title} onChange={onChange} />
        <ValidTextarea name="description" label="description" value={metadata.description} onChange={onChange} />
        <button className="btn" onClick={handleCancel}>Cancel</button>
        <input className="btn btn-primary" type="submit" value="Save" />
      </div>
    </form>
  );
};

MetadataForm.propTypes = {
  metadata: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default MetadataForm;
