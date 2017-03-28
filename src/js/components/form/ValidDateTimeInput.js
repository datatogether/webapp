import React, { PropTypes } from 'react';
import DateInput from './DateInput';

const ValidDateTimeInput = ({ name, value, label, placeholder, disabled, onChange, error, showError }) => {
  return (
    <div className={(error && showError) ? "validFormField form-group has-error" : "validFormField form-group"}>
      {label && <label>{label}</label>}
      <DateInput
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

ValidDateTimeInput.propTypes = {
  // gotta name yo fields
  name: PropTypes.string.isRequired,
  // field value
  value: PropTypes.object,
  // onChange in the form (value, name)
  onChange: PropTypes.func.isRequired,
  // placeholder text
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // enable / disable the field
  disabled: PropTypes.bool,
  // error text, if any
  error: PropTypes.string,
  // explicit control over weather or not to display validation
  showError: PropTypes.bool,
};

ValidDateTimeInput.defaultProps = {
  name: "",
  value: new Date(),
  placeholder: "",
};

export default ValidDateTimeInput;
