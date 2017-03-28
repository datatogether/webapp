import React, { PropTypes } from 'react';

import ValidInput from './ValidInput';
import UrlInput from './UrlInput';
import TagInput from './TagInput';
import LanguageInput from './LanguageInput';
import ValidTextarea from './ValidTextarea';
import ValidSelect from './ValidSelect';
import ValidLicenseInput from './ValidLicenseInput';
import ValidDateTimeInput from './ValidDateTimeInput';


// Required fields to pass POD spec:
// √ title
// √ description
// √ keyword
// modified - need time & TZ fields
// publisher
// contactPoint
// identifier
// √ accessLevel
// bureauCode
// programCode
// √ license

const MetadataForm = ({ data, validation, onChange, onCancel, onSubmit }) => {
  const meta = data;
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data, e);
  };

  return (
    <div className="metadata form">
      <ValidInput name="title" label="title" value={meta.title} error={validation.title} onChange={onChange} />
      <ValidTextarea name="description" label="description" value={meta.description} error={validation.description} onChange={onChange} />
      <TagInput name="keyword" label="tags" value={meta.keyword} onChange={onChange} />
      <ValidDateTimeInput name="modified" label="Last Update" value={meta.modified} onChange={onChange} />
      <ValidDateTimeInput name="issued" label="Release Date" value={meta.issued} onChange={onChange} />
      <ValidInput name="identifier" label="Unique Identifier" value={meta.identifier} onChange={onChange} />
      <ValidSelect name="accessLevel" label="Public Access Level" value={meta.accessLevel} options={['public', 'restricted-public', 'non-public']} onChange={onChange} />
      <ValidLicenseInput name="license" label="License" value={meta.license} onChange={onChange} />
      <LanguageInput name="language" label="language" value={meta.language} onChange={onChange} />
      <UrlInput name="landingPage" label="landing page" value={meta.landingPage} onChange={onChange} />
      <ValidInput name="theme" label="Category" value={meta.theme} onChange={onChange} />
      <br />
      <button className="btn" onClick={onCancel}>Cancel</button>
      <input className="btn btn-primary" type="submit" value="Save" onClick={handleSubmit} />
    </div>
  );
};

MetadataForm.propTypes = {
  data: PropTypes.object.isRequired,
  validation: PropTypes.object,

  onChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

MetadataForm.defaultProps = {
  validation: {},
};

export default MetadataForm;
