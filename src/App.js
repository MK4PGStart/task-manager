import React, { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';

const STORAGE_KEY = 'tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // all, pending, in_progress, done

  // Загрузка задач из localStorage при монтировании
  useEffect(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Ошибка при загрузке задач:', error);
      }
    }
  }, []);

  // Сохранение задач в localStorage при изменении
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Добавление новой задачи
  const addTask = (title, description) => {
    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setTasks([...tasks, newTask]);
  };

  // Изменение статуса задачи
  const updateTaskStatus = (id, newStatus) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  // Удаление задачи
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Фильтрация задач
  const filteredTasks = filter === 'all'
    ? tasks
    : tasks.filter(task => task.status === filter);

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>Менеджер задач</h1>
          <p className="subtitle">Организуйте свои задачи эффективно</p>
        </header>

        <TaskForm onAddTask={addTask} />

        <FilterBar currentFilter={filter} onFilterChange={setFilter} />

        <TaskList
          tasks={filteredTasks}
          onUpdateStatus={updateTaskStatus}
          onDelete={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;

