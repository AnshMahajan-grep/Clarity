import React, { useState, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const AnnouncementCard = ({ ann, onDeleted, onUpdated }) => {
  const { user } = useContext(AuthContext) || {};
  const [addingLink, setAddingLink] = useState(false);
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);

  if (!ann) return null;
  const deadline = ann.deadline ? new Date(ann.deadline) : null;
  const isExpired = deadline ? deadline < new Date() : false;

  const canDelete = user && ann.postedBy && user.email === ann.postedBy.email;

  const handleAddLink = async (e) => {
    e.preventDefault();
    if (!link) return;
    setLoading(true);
    try {
      const res = await API.post(`/announcements/${ann._id}/resources`, { link });
      onUpdated && onUpdated(res.data);
      setLink('');
      setAddingLink(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Failed to add link');
    }
    setLoading(false);
  };

  const handleConfirm = async () => {
    try {
      const res = await API.post(`/announcements/${ann._id}/confirm`);
      onUpdated && onUpdated({ ...ann, confirmedCount: res.data.confirmedCount });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this announcement?')) return;
    try {
      await API.delete(`/announcements/${ann._id}`);
      onDeleted && onDeleted(ann._id);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete');
    }
  };

  return (
    <article className={`announcement-card ${isExpired ? 'expired' : ''}`}>
      <div className="announcement-header">
        <h3 className="announcement-title">{ann.title}</h3>
        {deadline && (
          <time className="deadline">{deadline.toLocaleString()}</time>
        )}
      </div>
      <p className="announcement-desc">{ann.description}</p>

      {ann.resources && ann.resources.length > 0 && (
        <div className="resources">
          <strong>Resources:</strong>
          <ul>
            {ann.resources.map((r, idx) => (
              <li key={idx}><a href={r.link} target="_blank" rel="noreferrer">{r.link}</a></li>
            ))}
          </ul>
        </div>
      )}

      <div className="announcement-meta">
        <span className="posted-by">{ann.postedBy?.name || ann.postedBy?.email}</span>
        <span className="batches">{ann.batches?.join(', ')}</span>
      </div>

      <div className="announcement-actions" style={{ marginTop: 10, display: 'flex', gap: 8 }}>
        <button className="btn btn-link" onClick={() => setAddingLink((s) => !s)}>{addingLink ? 'Cancel' : 'Add Link'}</button>
        <button className="btn" onClick={handleConfirm}>Confirm ({ann.confirmedCount || 0})</button>
        {canDelete && <button className="btn btn-outline" onClick={handleDelete}>Delete</button>}
      </div>

      {addingLink && (
        <form onSubmit={handleAddLink} style={{ marginTop: 8 }}>
          <input placeholder="https://resource.link" value={link} onChange={(e) => setLink(e.target.value)} />
          <div style={{ marginTop: 6 }}>
            <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add'}</button>
          </div>
        </form>
      )}
    </article>
  );
};

export default AnnouncementCard;
