import React from 'react';

const AnnouncementCard = ({ ann }) => {
  if (!ann) return null;
  const deadline = ann.deadline ? new Date(ann.deadline) : null;
  const isExpired = deadline ? deadline < new Date() : false;

  return (
    <article className={`announcement-card ${isExpired ? 'expired' : ''}`}>
      <div className="announcement-header">
        <h3 className="announcement-title">{ann.title}</h3>
        {deadline && (
          <time className="deadline">{deadline.toLocaleString()}</time>
        )}
      </div>
      <p className="announcement-desc">{ann.description}</p>
      <div className="announcement-meta">
        <span className="posted-by">{ann.postedBy?.name || ann.postedBy?.email}</span>
        <span className="batches">{ann.batches?.join(', ')}</span>
      </div>
    </article>
  );
};

export default AnnouncementCard;
