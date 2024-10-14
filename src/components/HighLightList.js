import React, { useState, useEffect } from "react";
import axios from "axios";
import HighlightItem from "./HighLightItem";
import { BsInfoCircleFill } from "react-icons/bs";

function HighlightList() {
  const [highlights, setHighlights] = useState([]);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  const [editingHighlightId, setEditingHighlightId] = useState(null);

  useEffect(() => {
    axios
      .get("https://gorin-system-backend-task.onrender.com/api/highlights")
      .then((response) => {
        setHighlights(response.data);
      });
  }, []);

  const handleAddHighlight = () => {
    const newHighlight = { id: Date.now(), text: "" };
    setHighlights([...highlights, newHighlight]);
    setEditingHighlightId(newHighlight.id);
  };

  const handleUpdateHighlight = (id, newText) => {
    const updatedHighlights = highlights.map((highlight) =>
      highlight.id === id ? { ...highlight, text: newText } : highlight
    );
    setHighlights(updatedHighlights);
    axios.put(
      "https://gorin-system-backend-task.onrender.com/api/highlights",
      updatedHighlights
    );
    setEditingHighlightId(null);
  };

  const handleDeleteHighlight = (id) => {
    const updatedHighlights = highlights.filter(
      (highlight) => highlight.id !== id
    );
    setHighlights(updatedHighlights);
    axios.put(
      "https://gorin-system-backend-task.onrender.com/api/highlights",
      updatedHighlights
    );
  };

  const handleDragStart = (index) => {
    setDraggedItemIndex(index);
  };

  const handleDragOver = (index) => {
    if (draggedItemIndex === index) return;
    const reorderedHighlights = [...highlights];
    const draggedItem = reorderedHighlights.splice(draggedItemIndex, 1)[0];
    reorderedHighlights.splice(index, 0, draggedItem);
    setDraggedItemIndex(index);
    setHighlights(reorderedHighlights);
  };

  const handleDrop = () => {
    axios.put(
      "https://gorin-system-backend-task.onrender.com/api/highlights",
      highlights
    );
    setDraggedItemIndex(null);
  };

  return (
    <div className="highlight-container">
      <div className="header">
        <h3 className="heading">
          Property Highlights <BsInfoCircleFill className="heading-icon" />
        </h3>
        <button className="add-btn" onClick={handleAddHighlight}>
          + Add Highlight
        </button>
      </div>
      {highlights.map((highlight, index) => (
        <HighlightItem
          key={highlight.id}
          highlight={highlight}
          index={index}
          onDragStart={() => handleDragStart(index)}
          onDragOver={() => handleDragOver(index)}
          onDrop={handleDrop}
          onUpdate={handleUpdateHighlight}
          onDelete={handleDeleteHighlight}
          isEditing={editingHighlightId === highlight.id}
          onEdit={() => setEditingHighlightId(highlight.id)}
        />
      ))}
    </div>
  );
}

export default HighlightList;
