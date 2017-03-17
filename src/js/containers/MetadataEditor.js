import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Metadata from '../components/Metadata';
import MetadataForm from '../components/MetadataForm';

import { newMetadata, editMetadata, updateMetadata, cancelMetadataEdit, saveMetadata, loadMetadata } from '../actions/metadata';
import { selectLocalMetadata, selectMetadata } from '../selectors/metadata';
import { selectDefaultKeyId } from '../selectors/keys';

class MetadataEditor extends React.Component {
  constructor(props) {
    super(props);

    [
      "handleChange",
      "handleCancel",
      "handleNew",
      "handleEdit",
      "handleSave",
    ].forEach((m) => { this[m] = this[m].bind(this); });
  }

  componentWillMount() {
    if (this.props.sessionKeyId) {
      this.props.loadMetadata(this.props.sessionKeyId, this.props.subjectHash);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sessionKeyID != this.props.sessionKeyId) {
      nextProps.loadMetadata(nextProps.sessionKeyId, this.props.subjectHash);
    }
  }

  handleNew() {
    this.props.newMetadata(this.props.sessionKeyId, this.props.subjectHash);
  }

  handleEdit() {
    this.props.editMetadata(this.props.savedMetadata);
  }

  handleChange(name, value) {
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
    const { savedMetadata, metadata } = this.props;

    if (savedMetadata && !metadata) {
      return (
        <div className="metadata editor">
          <Metadata metadata={savedMetadata.meta} />
          <button className="btn btn-primary" onClick={this.handleEdit}>Edit</button>
        </div>
      );
    } else if (!metadata) {
      return (
        <div className="metadata editor">
          <button className="btn btn-primary" onClick={this.handleNew}>Add Metadata</button>
        </div>
      );
    }

    return (
      <div className="metadata editor">
        <MetadataForm
          metadata={metadata.meta}
          onChange={this.handleChange}
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
