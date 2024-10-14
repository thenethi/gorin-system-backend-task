import React, { useState, useEffect } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

function HighlightItem({
  highlight,
  index,
  onDragStart,
  onDragOver,
  onDrop,
  onUpdate,
  onDelete,
  isEditing,
  onEdit,
}) {
  const [text, setText] = useState(highlight.text);

  useEffect(() => {
    setText(highlight.text);
  }, [highlight.text]);

  const handleSave = () => {
    onUpdate(highlight.id, text);
  };

  return (
    <div
      className="highlight-item"
      draggable
      onDragStart={onDragStart}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      onDragEnter={onDragOver}
    >
      <div className="drag-handle">::</div>
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleSave}
          autoFocus
        />
      ) : (
        <p onClick={onEdit}>{highlight.text}</p>
      )}
      <button className="delete-btn" onClick={() => onDelete(highlight.id)}>
        <RiDeleteBinLine />
      </button>
    </div>
  );
}

export default HighlightItem;
