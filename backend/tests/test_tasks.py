import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base, get_db
from app.models import TaskStatus
import sys
import os

# Добавляем путь к корню проекта
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from main import app

# Тестовая база данных
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(scope="function")
def client():
    Base.metadata.create_all(bind=engine)
    yield TestClient(app)
    Base.metadata.drop_all(bind=engine)

def test_create_task(client):
    """Тест создания задачи"""
    response = client.post(
        "/api/tasks/",
        json={
            "title": "Тестовая задача",
            "description": "Описание тестовой задачи",
            "status": "pending"
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Тестовая задача"
    assert data["description"] == "Описание тестовой задачи"
    assert data["status"] == "pending"
    assert "id" in data
    assert "created_at" in data

def test_get_tasks(client):
    """Тест получения списка задач"""
    # Создаем задачу
    client.post(
        "/api/tasks/",
        json={"title": "Задача 1", "status": "pending"}
    )
    client.post(
        "/api/tasks/",
        json={"title": "Задача 2", "status": "in_progress"}
    )
    
    # Получаем все задачи
    response = client.get("/api/tasks/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    
    # Фильтруем по статусу
    response = client.get("/api/tasks/?status=pending")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["status"] == "pending"

def test_get_task_by_id(client):
    """Тест получения задачи по ID"""
    # Создаем задачу
    create_response = client.post(
        "/api/tasks/",
        json={"title": "Задача для получения", "status": "pending"}
    )
    task_id = create_response.json()["id"]
    
    # Получаем задачу
    response = client.get(f"/api/tasks/{task_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == task_id
    assert data["title"] == "Задача для получения"

def test_update_task(client):
    """Тест обновления задачи"""
    # Создаем задачу
    create_response = client.post(
        "/api/tasks/",
        json={"title": "Исходная задача", "status": "pending"}
    )
    task_id = create_response.json()["id"]
    
    # Обновляем задачу
    response = client.put(
        f"/api/tasks/{task_id}",
        json={"title": "Обновленная задача", "status": "done"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Обновленная задача"
    assert data["status"] == "done"

def test_delete_task(client):
    """Тест удаления задачи"""
    # Создаем задачу
    create_response = client.post(
        "/api/tasks/",
        json={"title": "Задача для удаления", "status": "pending"}
    )
    task_id = create_response.json()["id"]
    
    # Удаляем задачу
    response = client.delete(f"/api/tasks/{task_id}")
    assert response.status_code == 204
    
    # Проверяем, что задача удалена
    response = client.get(f"/api/tasks/{task_id}")
    assert response.status_code == 404

