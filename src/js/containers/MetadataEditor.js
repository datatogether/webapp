import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Metadata from '../components/Metadata';
import MetadataForm from '../components/MetadataForm';

import { newMetadata, editMetadata, updateMetadata, cancelMetadataEdit, saveMetadata, loadMetadata } from '../actions/metadata';
import { selectLocalMetadata, selectMetadata } from '../selectors/metadata';

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
    // this.props.loadUserByUsername(this.props.username);
    // Debounce search to avoid hammering the server with relentless queries
    // 250ms delay should be enough
    // this.props.search = debounce(this.props.search, 250);
    this.props.loadMetadata(this.props.userId, this.props.subjectHash);
  }

  componentWillReceiveProps() {
    // if (nextProps.username != this.props.username) {
    //   nextProps.loadUserByUsername(nextProps.username)
    // }
  }

  handleNew() {
    this.props.newMetadata(this.props.userId, this.props.subjectHash);
  }

  handleEdit() {
    this.props.editMetadata(this.props.savedMetadata);
  }

  handleChange(name, value) {
    this.props.updateMetadata(Object.assign({}, this.props.metadata, { [name]: value }));
  }

  handleCancel() {
    this.props.cancelMetadataEdit(this.props.metadata);
  }

  handleSave(metadata) {
    this.props.saveMetadata(metadata);
    // TODO - this should be in a "then" clause on saveMetadata
    this.props.cancelMetadataEdit(this.props.metadata);
  }

  render() {
    const { savedMetadata, metadata } = this.props;

    if (savedMetadata && !metadata) {
      return (
        <div className="metadata editor">
          <Metadata metadata={savedMetadata} />
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
          metadata={metadata}
          onChange={this.handleChange}
          onCancel={this.handleCancel}
          onSubmit={this.handleSave}
        />
      </div>
    );
  }
}

MetadataEditor.propTypes = {
  userId: PropTypes.string,
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

  return Object.assign({
    userId: "user",
    savedMetadata: selectMetadata(state, "user", subjectHash),
    metadata: selectLocalMetadata(state, "user", subjectHash),
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
