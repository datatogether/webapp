import React from 'react';
import { Link } from 'react-router';

import ProgressBar from '../ProgressBar';

const TaskItem = ({ data }) => {
  const task = data;

  return (
    <div className="task item col-md-12">
      <Link to={`/tasks/${task.id}`}>
        <h4 className="title">{task.title}</h4>
        {/*<div className="info">
          <ProgressBar size="micro" color="blue" total={task.stats.contentUrlCount} progress={task.stats.contentMetadataCount} />
          <i>{task.stats.contentMetadataCount}/{task.stats.contentUrlCount}</i>
        </div>*/}
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
