import React from 'react';
import { Link } from 'react-router';

import ProgressBar from '../ProgressBar';

const TaskItem = ({ data }) => {
  const task = data;

  return (
    <div className="task item col-md-12">
      <Link to={`/tasks/${task.id}`}>
       <h6 className="title">{task.title}</h6>
          {task.progress && !task.succeeded && !task.error && <div className="info">
            <ProgressBar size="micro" color="blue" progress={task.progress.percent * 100} />
            <i>{task.progress.status}</i>
          </div>}
          {task.progress && task.succeeded && !task.error && <div>done!</div>}
          {task.error && <div className="error">{task.error}</div>}
      </Link>
    </div>
  );
};

TaskItem.propTypes = {
  data: React.PropTypes.object.isRequired,
  // onSelect: React.PropTypes.func.isRequired,
};

TaskItem.defaultProps = {
};

export default TaskItem;
