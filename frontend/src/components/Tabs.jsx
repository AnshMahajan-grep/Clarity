import React from 'react';

const Tabs = ({ batches, active, onChange }) => {
  return (
    <div className="tabs">
      {batches.map((b) => (
        <button
          key={b}
          className={`tab ${active === b ? 'active' : ''}`}
          onClick={() => onChange(b)}
        >
          {b}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
