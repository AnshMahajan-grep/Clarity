import React, { useState } from 'react';
import API from '../api/axios';

const TaskCard = ({ task, onDone, onDeleted }) => {
  const [loading, setLoading] = useState(false);
  if (!task) return null;

  const handleDone = async () => {
    if (!confirm('Mark this task as done and remove it?')) return;
    setLoading(true);
    try {
      // mark done on server (status) then remove locally via callback
      await API.patch(`/tasks/${task._id}`, { status: 'done' });
      onDone && onDone(task._id);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Failed to mark done');
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!confirm('Delete this task?')) return;
    setLoading(true);
    try {
      await API.delete(`/tasks/${task._id}`);
      onDeleted && onDeleted(task._id);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete');
    }
    setLoading(false);
  };

  return (
    <div className="task-card">
      <div className="task-title">{task.title}</div>
      <div className="task-desc">{task.description}</div>
      <div className="task-meta">
        <span className="task-deadline">
          {task.deadline ? new Date(task.deadline).toLocaleString() : 'No deadline'}
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary" onClick={handleDone} disabled={loading}>Done</button>
          <button className="btn btn-outline" onClick={handleDelete} disabled={loading}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
