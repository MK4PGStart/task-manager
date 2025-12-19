const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Для DELETE запросов может не быть тела ответа
      if (response.status === 204) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Получить все задачи
  async getTasks(status = null) {
    const endpoint = status 
      ? `/api/tasks/?status=${status}`
      : '/api/tasks/';
    return this.request(endpoint);
  }

  // Получить задачу по ID
  async getTask(id) {
    return this.request(`/api/tasks/${id}`);
  }

  // Создать задачу
  async createTask(task) {
    return this.request('/api/tasks/', {
      method: 'POST',
      body: JSON.stringify(task),
    });
  }

  // Обновить задачу
  async updateTask(id, updates) {
    return this.request(`/api/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // Удалить задачу
  async deleteTask(id) {
    return this.request(`/api/tasks/${id}`, {
      method: 'DELETE',
    });
  }
}

export default new ApiService();

