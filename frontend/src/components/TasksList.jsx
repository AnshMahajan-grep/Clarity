import React from 'react';
import TaskCard from './TaskCard';

const TasksList = ({ tasks, onDone, onDeleted }) => {
  if (!tasks) return null;
  return (
    <div className="tasks-list">
      {tasks.length === 0 ? (
        <div className="empty">No personal tasks. Add some to stay productive.</div>
      ) : (
        tasks.map((t) => <TaskCard key={t._id} task={t} onDone={onDone} onDeleted={onDeleted} />)
      )}
    </div>
  );
};

export default TasksList;
