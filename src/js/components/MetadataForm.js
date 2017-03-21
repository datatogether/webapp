import React, { PropTypes } from 'react';

import ValidInput from './ValidInput';
import ValidTextarea from './ValidTextarea';

const MetadataField = ({ name, value, onChangeValue, onRenameField, onRemoveField }) => {
  const rename = (prevName, _, newName) => {
    onRenameField(prevName, newName);
  };

  return (
    <div>
      <ValidInput name="field" label="name" value={name} onChange={rename.bind(this, name)} />
      <ValidTextarea name={name} label="value" value={value} onChange={onChangeValue} />
      <a className="red" onClick={onRemoveField.bind(this, name)}>X</a>
    </div>
  );
};

const MetadataForm = ({ metadata, onChangeValue, onCancel, onSubmit, onRenameField, onAddField, onRemoveField }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(metadata, e);
  };

  return (
    <div className="metadata row">
      <div className="col-md-12">
        {Object.keys(metadata).map((key, i) => {
          return (
            <MetadataField
              key={i}
              name={key}
              value={metadata[key]}
              onRenameField={onRenameField}
              onRemoveField={onRemoveField}
              onChangeValue={onChangeValue}
            />);
        })}
        <button className="btn" onClick={onAddField}>Add Field</button>
        <br />
        <button className="btn" onClick={onCancel}>Cancel</button>
        <input className="btn btn-primary" type="submit" value="Save" onClick={handleSubmit} />
      </div>
    </div>
  );
};

MetadataForm.propTypes = {
  metadata: PropTypes.object.isRequired,

  onAddField: PropTypes.func.isRequired,
  onRenameField: PropTypes.func.isRequired,
  onRemoveField: PropTypes.func.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default MetadataForm;
