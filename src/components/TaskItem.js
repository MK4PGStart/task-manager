import React from 'react';
import './TaskItem.css';

const STATUS_LABELS = {
  pending: 'Ожидает',
  in_progress: 'В работе',
  done: 'Выполнено'
};

function TaskItem({ task, onUpdateStatus, onDelete, index }) {
  const handleStatusChange = (e) => {
    onUpdateStatus(task.id, e.target.value);
  };

  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
      onDelete(task.id);
    }
  };

  const getNextStatus = () => {
    const statusOrder = ['pending', 'in_progress', 'done'];
    const currentIndex = statusOrder.indexOf(task.status);
    return statusOrder[(currentIndex + 1) % statusOrder.length];
  };

  const handleQuickStatusChange = () => {
    onUpdateStatus(task.id, getNextStatus());
  };

  return (
    <div
      className="task-item"
      data-status={task.status}
    >
      <div className="task-content">
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          <span
            className="task-status-badge"
            data-status={task.status}
          >
            {STATUS_LABELS[task.status]}
          </span>
        </div>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
      </div>

      <div className="task-actions">
        <select
          className="status-select"
          value={task.status}
          onChange={handleStatusChange}
          aria-label="Изменить статус"
        >
          <option value="pending">Ожидает</option>
          <option value="in_progress">В работе</option>
          <option value="done">Выполнено</option>
        </select>
        <button
          className="btn-quick-status"
          onClick={handleQuickStatusChange}
          title="Быстрое переключение статуса"
        >
          ↻
        </button>
        <button
          className="btn-delete"
          onClick={handleDelete}
          aria-label="Удалить задачу"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TaskItem;

