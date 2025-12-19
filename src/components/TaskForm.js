import React, { useState } from 'react';
import './TaskForm.css';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title, description);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Название задачи *</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Введите название задачи"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Описание</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Введите описание задачи (необязательно)"
          rows="3"
        />
      </div>
      <button type="submit" className="btn-add">
        Добавить задачу
      </button>
    </form>
  );
}

export default TaskForm;

