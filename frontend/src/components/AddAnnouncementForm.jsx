import React, { useState } from 'react';
import API from '../api/axios';

const availableBatches = [2027, 2028, 2029];

const AddAnnouncementForm = ({ onCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [category, setCategory] = useState('General');
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function toggleBatch(b) {
    setSelected((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!title || !description || selected.length === 0 || !deadline) {
      setError('Please fill title, description, select at least one batch and deadline');
      return;
    }
    setLoading(true);
    try {
      const payload = { title, description, deadline, category, batches: selected };
      const res = await API.post('/announcements', payload);
      setTitle(''); setDescription(''); setDeadline(''); setSelected([]);
      onCreated && onCreated(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create announcement');
    }
    setLoading(false);
  };

  return (
    <form className="add-ann-form" onSubmit={handleSubmit}>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <label className="muted">Deadline</label>
      <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} />

      <div className="batches-row">
        {availableBatches.map((b) => (
          <label key={b} className="chip">
            <input type="checkbox" checked={selected.includes(b)} onChange={() => toggleBatch(b)} />
            <span>{b}</span>
          </label>
        ))}
      </div>

      {error && <div className="form-error">{error}</div>}
      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Create Announcement'}</button>
      </div>
    </form>
  );
};

export default AddAnnouncementForm;
