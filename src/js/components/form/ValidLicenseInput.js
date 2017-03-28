import React, { PropTypes } from 'react';

const ValidLicenseInput = ({ label, name, showError, error, value, onChange }) => {
  return (
    <div className={(error && showError) ? "validFormField form-group has-error" : "validFormField form-group"}>
      {label ? <label className="control-label" htmlFor={name}>{label}</label> : undefined }
      <select id={name} name={name} className="form-control" value={value} onChange={(e) => { onChange(name, e.target.value, e); }}>
        <option value="http://www.usa.gov/publicdomain/label/1.0/">US Public Domain</option>
        <option value="https://creativecommons.org/publicdomain/zero/1.0/">CC0 - Creative Commons Zero Public Domain Dedication</option>
        <option value="http://opendatacommons.org/licenses/pddl/1.0/">PDDL - Open Data Commons Public Domain Dedication and Licence</option>
        <option value="http://opendatacommons.org/licenses/by/1.0/">ODC-By - Open Data Commons Attribution License</option>
        <option value="http://opendatacommons.org/licenses/odbl/1.0/">ODbL - Open Data Commons Open Database Licens</option>
        <option value="https://creativecommons.org/licenses/by/4.0/">CC BY - Creative Commons Attribution</option>
        <option value="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA - Creative Commons Attribution-ShareAlike</option>
        <option value="http://www.gnu.org/licenses/fdl-1.3.en.html">GNU Free Documentation License</option>
      </select>
      {(error != "" && showError) ? <div className="control-label">{error}</div> : undefined}
    </div>
  );
};

ValidLicenseInput.propTypes = {
  // required name for the field
  name: PropTypes.string.isRequired,
  // if provided it'll create a label element to accompany the field
  label: PropTypes.string,
  // value to display in the field
  value: PropTypes.string.isRequired,
  // an error message to displacy
  error: PropTypes.string,
  // weather or not to actually display any passed-in errors
  showError: PropTypes.bool,
  // change handler func. will be called with (name, value, event)
  onChange: PropTypes.func.isRequired,
};

ValidLicenseInput.defaultProps = {
  name: undefined,
  error: undefined,
  showError: true,
  placeholder: "",
  // https://project-open-data.cio.gov/open-licenses/
  value: "http://www.usa.gov/publicdomain/label/1.0/",
};

export default ValidLicenseInput;
