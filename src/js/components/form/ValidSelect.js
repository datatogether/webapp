import React, { PropTypes } from 'react';

const ValidSelect = ({ label, name, options, showError, error, value, onChange }) => {
  return (
    <div className={(error && showError) ? "validFormField form-group has-error" : "validFormField form-group"}>
      {label ? <label className="control-label" htmlFor={name}>{label}</label> : undefined }
      <select id={name} name={name} className="form-control" value={value} onChange={(e) => { onChange(name, e.target.value, e); }}>
        <option value=""></option>
        {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
      </select>
      {(error != "" && showError) ? <div className="control-label">{error}</div> : undefined}
    </div>
  );
};

ValidSelect.propTypes = {
  // required name for the field
  name: PropTypes.string.isRequired,
  // if provided it'll create a label element to accompany the field
  label: PropTypes.string,
  // value to display in the field
  value: PropTypes.string.isRequired,
  // array of option strings
  options: PropTypes.array.isRequired,
  // an error message to displacy
  error: PropTypes.string,
  // weather or not to actually display any passed-in errors
  showError: PropTypes.bool,
  // change handler func. will be called with (name, value, event)
  onChange: PropTypes.func.isRequired,
};

ValidSelect.defaultProps = {
  name: undefined,
  error: undefined,
  showError: true,
  placeholder: "",
};

export default ValidSelect;
