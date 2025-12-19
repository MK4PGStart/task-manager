import React from 'react';
import './TaskCard.css';

function TaskCard({ task, onUpdateStatus, onDelete }) {
  const handleStatusChange = (newStatus) => {
    onUpdateStatus(task.id, newStatus);
  };

  const handleDelete = () => {
    if (window.confirm('Удалить эту задачу?')) {
      onDelete(task.id);
    }
  };

  const getNextStatus = () => {
    const statusOrder = ['pending', 'in_progress', 'done'];
    const currentIndex = statusOrder.indexOf(task.status);
    return statusOrder[(currentIndex + 1) % statusOrder.length];
  };

  const handleQuickStatusChange = () => {
    handleStatusChange(getNextStatus());
  };

  return (
    <div className="task-card" data-status={task.status}>
      <div className="task-card-content">
        <h4 className="task-card-title">{task.title}</h4>
        {task.description && (
          <p className="task-card-description">{task.description}</p>
        )}
      </div>
      <div className="task-card-actions">
        <button
          className="task-card-btn task-card-btn-move"
          onClick={handleQuickStatusChange}
          title="Переместить в следующую колонку"
        >
          →
        </button>
        <button
          className="task-card-btn task-card-btn-delete"
          onClick={handleDelete}
          title="Удалить задачу"
          aria-label="Удалить задачу"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default TaskCard;

