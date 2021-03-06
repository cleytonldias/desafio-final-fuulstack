import React from 'react';

export default function Action({ id, type, onActionClick }) {
  const handleIconClick = () => {
    onActionClick(id, type);
  };
  return (
    <span
      style={{ cursor: 'pointer' }}
      className="material-icons"
      onClick={handleIconClick}
    >
      {type}
    </span>
  );
}
