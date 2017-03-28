import React, { PropTypes } from 'react';

const TagInput = ({ label, name, type, showError, error, value, placeholder, onChange }) => {
  return (
    <div className={(error && showError) ? "validFormField form-group has-error" : "validFormField form-group"}>
      {label ? <label className="control-label" htmlFor={name}>{label}</label> : undefined }
      <input
        id={name}
        name={name}
        type="text"
        className="form-control"
        value={value}
        placeholder={placeholder}
        onChange={(e) => { onChange(name, e.target.value, e); }}
      />
      {(error != "" && showError) ? <div className="control-label">{error}</div> : undefined}
    </div>
  );
};

TagInput.propTypes = {
  // required name for the field
  name: PropTypes.string.isRequired,
  // if provided it'll create a label element to accompany the field
  label: PropTypes.string,
  // value to display in the field
  value: PropTypes.string.isRequired,
  // placeholder text for an empty field. default: ""
  placeholder: PropTypes.string,
  // an error message to displacy
  error: PropTypes.string,
  // weather or not to actually display any passed-in errors
  showError: PropTypes.bool,
  // change handler func. will be called with (name, value, event)
  onChange: PropTypes.func.isRequired,
};

TagInput.defaultProps = {
  name: undefined,
  type: "text",
  error: undefined,
  showError: true,
  placeholder: "",
};

export default TagInput;
