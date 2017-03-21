import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Metadata from '../components/Metadata';
import MetadataForm from '../components/MetadataForm';

import { newMetadata, editMetadata, updateMetadata, cancelMetadataEdit, saveMetadata, loadMetadata } from '../actions/metadata';
import { selectLocalMetadata, selectMetadata } from '../selectors/metadata';
import { selectDefaultKeyId } from '../selectors/keys';

class MetadataEditor extends React.Component {
  constructor(props) {
    super(props);

    [
      "handleNew",
      "handleEdit",
      "handleAddField",
      "handleRenameField",
      "handleRemoveField",
      "handleChangeValue",
      "handleCancel",
      "handleSave",
    ].forEach((m) => { this[m] = this[m].bind(this); });
  }

  componentWillMount() {
    if (this.props.sessionKeyId) {
      this.props.loadMetadata(this.props.sessionKeyId, this.props.subjectHash);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sessionKeyId != this.props.sessionKeyId) {
      nextProps.loadMetadata(nextProps.sessionKeyId, this.props.subjectHash);
    }
  }

  handleNew() {
    this.props.newMetadata(this.props.sessionKeyId, this.props.subjectHash);
  }

  handleEdit() {
    this.props.editMetadata(this.props.savedMetadata);
  }

  handleAddField() {
    const change = { meta: Object.assign({}, this.props.metadata.meta, { new_field: "" }) };
    this.props.updateMetadata({ meta: Object.assign({}, this.props.metadata, change) });
  }

  handleRenameField(prevName, newName) {
    const change = { meta: Object.assign({}, this.props.metadata.meta, { [newName]: this.props.metadata.meta[prevName] }) };
    delete change.meta[prevName];
    this.props.updateMetadata(Object.assign({}, this.props.metadata, change));
  }

  handleRemoveField(field) {
    const change = { meta: Object.assign({}, this.props.metadata.meta) };
    delete change.meta[field];
    this.props.updateMetadata(Object.assign({}, this.props.metadata, change));
  }

  handleChangeValue(name, value) {
    const change = { meta: Object.assign({}, this.props.metadata.meta, { [name]: value }) };
    this.props.updateMetadata(Object.assign({}, this.props.metadata, change));
  }

  handleCancel() {
    this.props.cancelMetadataEdit(this.props.metadata);
  }

  handleSave(meta) {
    this.props.saveMetadata({ keyId: this.props.sessionKeyId, subject: this.props.subjectHash, meta });
    // TODO - this should be in a "then" clause on saveMetadata
    this.props.cancelMetadataEdit(this.props.metadata);
  }

  render() {
    const { savedMetadata, metadata, sessionKeyId } = this.props;

    if (savedMetadata && !metadata) {
      return (
        <div className="metadata editor">
          <Metadata metadata={savedMetadata.meta} />
          {sessionKeyId ? <button className="btn btn-primary" onClick={this.handleEdit}>Edit</button> : <p><Link to="/signup">Signup</Link> to edit metadata.</p>}
        </div>
      );
    } else if (!metadata) {
      return (
        <div className="metadata editor">
          {sessionKeyId ? <button className="btn btn-primary" onClick={this.handleNew}>Add Metadata</button> : <p><Link to="/signup">Signup</Link> to add metadata.</p>}
        </div>
      );
    }

    return (
      <div className="metadata editor">
        <MetadataForm
          metadata={metadata.meta}
          onAddField={this.handleAddField}
          onRenameField={this.handleRenameField}
          onRemoveField={this.handleRemoveField}
          onChangeValue={this.handleChangeValue}
          onCancel={this.handleCancel}
          onSubmit={this.handleSave}
        />
      </div>
    );
  }
}

MetadataEditor.propTypes = {
  sessionKeyId: PropTypes.string,
  subjectHash: PropTypes.string.isRequired,

  metadata: PropTypes.object,
  savedMetadata: PropTypes.object,

  newMetadata: PropTypes.func.isRequired,
  editMetadata: PropTypes.func.isRequired,
  updateMetadata: PropTypes.func.isRequired,
  cancelMetadataEdit: PropTypes.func.isRequired,
  loadMetadata: PropTypes.func.isRequired,
  saveMetadata: PropTypes.func.isRequired,
};

MetadataEditor.defaultProps = {
};

function mapStateToProps(state, ownProps) {
  const subjectHash = ownProps.subjectHash;
  const sessionKeyId = selectDefaultKeyId(state);

  return Object.assign({
    sessionKeyId,
    savedMetadata: selectMetadata(state, sessionKeyId, subjectHash),
    metadata: selectLocalMetadata(state, sessionKeyId, subjectHash),
  }, ownProps);
}

export default connect(mapStateToProps, {
  newMetadata,
  editMetadata,
  updateMetadata,
  cancelMetadataEdit,
  loadMetadata,
  saveMetadata,
})(MetadataEditor);
