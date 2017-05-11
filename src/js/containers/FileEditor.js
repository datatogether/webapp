import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { newFile, editFile, updateFile, cancelFileEdit, saveFile, loadFile } from '../actions/files';
import { selectLocalFile, selectFile } from '../selectors/file';
import { selectDefaultKeyId } from '../selectors/keys';
import CodeEditor from '../components/CodeEditor';

class FileEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showHelp: true,
    };

    [
      "handleNew",
      "handleEdit",
      "handleChange",
      "handleCancel",
      "handleSave",
      "handleToggleHelp",
    ].forEach((m) => { this[m] = this[m].bind(this); });
  }

  componentWillMount() {
    // if (this.props.sessionKeyId) {
      // this.props.loadFile(this.props.sessionKeyId, this.props.subjectHash);
    // }
    this.props.newFile({});
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.sessionKeyId != this.props.sessionKeyId) {
    //   nextProps.loadFile(nextProps.sessionKeyId, this.props.subjectHash);
    // }
  }

  handleNew() {
    // this.props.newFile(this.props.sessionKeyId, this.props.subjectHash);
  }

  handleEdit() {
    // this.props.editFile(this.props.savedFile);
  }

  handleChange(value) {
    // const change = { meta: Object.assign({}, this.props.file.meta, { [name]: value }) };
    this.props.updateFile(Object.assign({}, this.props.file, { data : value }));
  }

  handleCancel() {
    this.props.cancelFileEdit(this.props.file);
  }

  handleSave(meta) {
    // this.props.saveFile({ keyId: this.props.sessionKeyId, subject: this.props.subjectHash, meta });
    // TODO - this should be in a "then" clause on saveFile
    // this.props.cancelFileEdit(this.props.file);
  }

  handleToggleHelp() {
    // this.setState({ showHelp: !this.state.showHelp });
  }

  render() {
    const { savedFile, file, sessionKeyId } = this.props;
    const { showHelp } = this.state;


    // onChange={(value) => onChange({ statement : value, address : query.address})}
    return (
      <div id="fileEditor" className="page container">
        <header>
          <h1>Edit File</h1>
        </header>
        <div>
          {file && 
          <CodeEditor 
            value={file.data}
            mode='javascript'
            onChange={this.handleChange}
            setOptions={{ enableBasicAutocompletion: true, enableLiveAutocompletion : true }}
          />}
        </div>
      </div>
    );

    // if (savedFile && !file) {
    //   return (
    //     <div className="file editor col-md-12">
    //       <File file={savedFile.meta} />
    //       {sessionKeyId ? <button className="btn btn-primary" onClick={this.handleEdit}>Edit</button> : <p><Link to="/signup">Signup</Link> to edit file.</p>}
    //     </div>
    //   );
    // } else if (!file) {
    //   return (
    //     <div className="file editor col-md-12">
    //       {sessionKeyId ? <button className="btn btn-primary" onClick={this.handleNew}>Add File</button> : <p><Link to="/signup">Signup</Link> to add file.</p>}
    //     </div>
    //   );
    // }

    // return (
    //   <div className="file editor col-md-12">
    //     <a className="helpToggle right" onClick={this.handleToggleHelp}>{showHelp ? "hide help" : "show help" }</a>
    //     <FileForm
    //       data={file.meta}
    //       onChange={this.handleChange}
    //       onCancel={this.handleCancel}
    //       onSubmit={this.handleSave}
    //       showHelpText={showHelp}
    //     />
    //     <br />
    //   </div>
    // );
  }
}

FileEditor.propTypes = {
  sessionKeyId: PropTypes.string,
  // subjectHash: PropTypes.string.isRequired,

  file: PropTypes.object,
  savedFile: PropTypes.object,

  newFile: PropTypes.func.isRequired,
  editFile: PropTypes.func.isRequired,
  updateFile: PropTypes.func.isRequired,
  cancelFileEdit: PropTypes.func.isRequired,
  // loadFile: PropTypes.func.isRequired,
  // saveFile: PropTypes.func.isRequired,
};

FileEditor.defaultProps = {
};

function mapStateToProps(state, ownProps) {
  const subjectHash = ownProps.subjectHash;
  const sessionKeyId = selectDefaultKeyId(state);

  return Object.assign({
    sessionKeyId,
    // savedFile: selectFile(state, sessionKeyId, subjectHash),
    file: selectLocalFile(state, "new"),
  }, ownProps);
}

export default connect(mapStateToProps, {
  newFile,
  editFile,
  updateFile,
  cancelFileEdit,
  // loadFile,
  // saveFile,
})(FileEditor);
