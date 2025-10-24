import React from 'react';

const TaskCard = ({ task }) => {
  if (!task) return null;
  return (
    <div className="task-card">
      <div className="task-title">{task.title}</div>
      <div className="task-desc">{task.description}</div>
      <div className="task-meta">
        <span className="task-deadline">
          {task.deadline ? new Date(task.deadline).toLocaleString() : 'No deadline'}
        </span>
        <button className="btn btn-link">Done</button>
      </div>
    </div>
  );
};

export default TaskCard;
