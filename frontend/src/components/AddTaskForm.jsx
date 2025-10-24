import React, { useState } from 'react';
import API from '../api/axios';

const AddTaskForm = ({ onCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [repeatDaily, setRepeatDaily] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!title) { setError('Title required'); return; }
    setLoading(true);
    try {
      const payload = { title, description, deadline, repeatDaily };
      const res = await API.post('/tasks', payload);
      setTitle(''); setDescription(''); setDeadline(''); setRepeatDaily(false);
      onCreated && onCreated(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create task');
    }
    setLoading(false);
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Notes (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
      <label className="muted">Deadline</label>
      <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
      <label className="muted checkbox-inline"><input type="checkbox" checked={repeatDaily} onChange={(e) => setRepeatDaily(e.target.checked)} /> Repeat daily</label>
      {error && <div className="form-error">{error}</div>}
      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Add Task'}</button>
      </div>
    </form>
  );
};

export default AddTaskForm;
