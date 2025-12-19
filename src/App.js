import React, { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import KanbanBoard from './components/KanbanBoard';
import api from './services/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка задач из API при монтировании
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getTasks();
      // Преобразуем формат данных из API в формат для компонентов
      const formattedTasks = data.map(task => ({
        id: task.id.toString(),
        title: task.title,
        description: task.description || '',
        status: task.status,
        createdAt: task.created_at
      }));
      setTasks(formattedTasks);
    } catch (err) {
      console.error('Ошибка при загрузке задач:', err);
      setError('Не удалось загрузить задачи. Проверьте подключение к серверу.');
    } finally {
      setLoading(false);
    }
  };

  // Добавление новой задачи
  const addTask = async (title, description) => {
    try {
      setError(null);
      const newTask = await api.createTask({
        title: title.trim(),
        description: description.trim() || null,
        status: 'pending'
      });
      // Преобразуем формат данных
      const formattedTask = {
        id: newTask.id.toString(),
        title: newTask.title,
        description: newTask.description || '',
        status: newTask.status,
        createdAt: newTask.created_at
      };
      setTasks([...tasks, formattedTask]);
    } catch (err) {
      console.error('Ошибка при создании задачи:', err);
      setError('Не удалось создать задачу.');
    }
  };

  // Изменение статуса задачи
  const updateTaskStatus = async (id, newStatus) => {
    try {
      setError(null);
      // Преобразуем id обратно в число для API
      const taskId = parseInt(id);
      await api.updateTask(taskId, { status: newStatus });
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, status: newStatus } : task
      ));
    } catch (err) {
      console.error('Ошибка при обновлении задачи:', err);
      setError('Не удалось обновить задачу.');
      // Перезагружаем задачи для синхронизации
      loadTasks();
    }
  };

  // Удаление задачи
  const deleteTask = async (id) => {
    try {
      setError(null);
      // Преобразуем id обратно в число для API
      const taskId = parseInt(id);
      await api.deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      console.error('Ошибка при удалении задачи:', err);
      setError('Не удалось удалить задачу.');
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>Менеджер задач</h1>
        </header>

        {error && (
          <div className="error-message" style={{
            padding: '12px',
            marginBottom: '20px',
            background: '#f44336',
            color: 'white',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <TaskForm onAddTask={addTask} />

        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#b0b0b0'
          }}>
            Загрузка задач...
          </div>
        ) : (
          <KanbanBoard
            tasks={tasks}
            onUpdateStatus={updateTaskStatus}
            onDelete={deleteTask}
          />
        )}
      </div>
    </div>
  );
}

export default App;

