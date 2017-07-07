import React from 'react';
import { Link } from 'react-router';

import ValidInput from './ValidInput';
import ValidSelect from './ValidSelect';

export default class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      task: {
        taskType: "ipfs.add",
        params: {
          url: "https://i.redd.it/59su4dfwq08z.jpg",
          ipfsApiServerUrl: "http://ipfs:5001/api/v0",
        },
      },
    };

    [
      "handleSubmit",
    ].forEach((m) => { this[m] = this[m].bind(this); });
  }

  handleSubmit() {
    console.log(this.state.task);
    this.props.onSubmit(this.state.task);
  }

  render() {
    return (
      <div className="task form col-md-3">
        <h3>New Task Form</h3>
        <button className="btn btn-primary" onClick={this.handleSubmit}>Submit Task</button>
      </div>
    );
  }
};

TaskForm.propTypes = {
  // data: React.PropTypes.object.isRequired,
  // onSelect: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
};

TaskForm.defaultProps = {
};