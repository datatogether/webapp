import React, { PropTypes } from 'react';
import DateInput from './DateInput';

const ValidDateInput = ({ name, label, valid, disabled, onChange }) => {
    var validClass = "", label, message, icon;

    if (this.props.label) {
      label = <label>{this.props.label}</label>
    }

    if (this.props.showValidation) {
      if (this.props.showValidationIcon) {
        icon = <span className="validation icon ss-icon">{this.props.valid ? "checked" : "close" }</span>
      }
      message = (this.props.valid) ? "" : this.props.message
      validClass = (this.props.valid) ? "valid " : "invalid "
    }

    return(
      <div {...this.props} className={validClass + this.props.className}>
        {label}
        <DateInput initialInputDelay={this.props.initialInputDelay} disabled={this.props.disabled} name={this.props.name} placeholder={this.props.placeholder} value={this.props.value} onChange={this.onValueChange} />
        {icon}
        <span className="message">{message}</span>
      </div>
    );
  }
};

ValidDateInput.propTypes = {
  // gotta name yo fields
  name: PropTypes.string.isRequired,
  // field value
  value: PropTypes.object,
  // a delay (in ms) before the component will respond.
  // good for when ui is changing under a ghost click
  initialInputDelay: PropTypes.number,
  // onChange in the form (value, name)
  onValueChange: PropTypes.func,
  // placeholder text
  placeholder: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
  // leave undefined to display no valid
  valid: PropTypes.bool,
  // leave undefined to display no message
  message: PropTypes.string,
  // enable / disable the field
  disabled: PropTypes.bool,
  // className will set on the containing div
  className: PropTypes.string,
  // explicit control over weather or not to display validation
  showValidation: PropTypes.bool,
  // flag for controlling display of a √ or x icon along with validation
  // defaults to false (not-showing)
  showValidationIcon: PropTypes.bool,
};

ValidDateInput.defaultProps = {
  name: "",
  value: new Date(),
  placeholder: "",
  className: " validTextArea field",
  showValidationIcon: false,
};

export default ValidDateInput;