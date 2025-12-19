import React from 'react';
import './KanbanBoard.css';
import TaskCard from './TaskCard';

const COLUMNS = [
  { id: 'pending', title: 'Ожидает', color: '#ff9800' },
  { id: 'in_progress', title: 'В работе', color: '#2196f3' },
  { id: 'done', title: 'Выполнено', color: '#4caf50' }
];

function KanbanBoard({ tasks, onUpdateStatus, onDelete }) {
  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="kanban-board">
      {COLUMNS.map(column => {
        const columnTasks = getTasksByStatus(column.id);
        return (
          <div key={column.id} className="kanban-column">
            <div className="kanban-column-header">
              <h3 className="kanban-column-title">{column.title}</h3>
              <span className="kanban-column-count">{columnTasks.length}</span>
            </div>
            <div className="kanban-column-content">
              {columnTasks.length === 0 ? (
                <div className="kanban-empty-state">
                  <p>Нет задач</p>
                </div>
              ) : (
                columnTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onUpdateStatus={onUpdateStatus}
                    onDelete={onDelete}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default KanbanBoard;

