import React from 'react';
import { Link } from 'react-router';

import ProgressBar from '../ProgressBar';

const TaskItem = ({ data }) => {
  const task = data;

  return (
    <div className="task item col-md-12">
      <Link to={`/tasks/${task.id}`}>
        <h6 className="title">{task.title}</h6>
        {task.progress && !task.succeeded && <div className="info">
          <ProgressBar size="micro" color="blue" progress={task.progress.percent} />
          <i>{task.progress.status}</i>
        </div>}
        {task.progress && task.succeeded && <div>done!</div>}
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
