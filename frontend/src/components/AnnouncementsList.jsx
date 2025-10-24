import React from 'react';
import AnnouncementCard from './AnnouncementCard';

const AnnouncementsList = ({ announcements }) => {
  if (!announcements) return null;

  // Filter out expired on client as extra safety
  const visible = announcements.filter((a) => {
    if (!a.deadline) return true;
    const d = new Date(a.deadline);
    return d >= new Date();
  });

  return (
    <div className="announcements-list">
      {visible.length === 0 ? (
        <div className="empty">No announcements available.</div>
      ) : (
        visible.map((ann) => <AnnouncementCard key={ann._id} ann={ann} />)
      )}
    </div>
  );
};

export default AnnouncementsList;
