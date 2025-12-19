import React from 'react';
import './TaskList.css';
import TaskItem from './TaskItem';

function TaskList({ tasks, onUpdateStatus, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>Нет задач для отображения</p>
        <span className="empty-icon">📝</span>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdateStatus={onUpdateStatus}
          onDelete={onDelete}
          index={index}
        />
      ))}
    </div>
  );
}

export default TaskList;

