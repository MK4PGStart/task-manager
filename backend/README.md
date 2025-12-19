# Task Manager API

REST API для управления задачами на FastAPI.

## Структура проекта

```
backend/
├── app/
│   ├── __init__.py
│   ├── database.py      # Настройка БД
│   ├── models.py        # SQLAlchemy модели
│   ├── schemas.py       # Pydantic схемы
│   └── routers/
│       ├── __init__.py
│       └── tasks.py     # API endpoints
├── alembic/             # Миграции БД
├── tests/                # Тесты
├── main.py              # Точка входа
├── requirements.txt     # Зависимости
└── Dockerfile          # Docker образ
```

## Установка и запуск

### Локально

1. Установите зависимости:
```bash
cd backend
pip install -r requirements.txt
```

2. Запустите сервер:
```bash
uvicorn main:app --reload
```

API будет доступен по адресу: http://localhost:8000

### Docker

```bash
docker build -t task-manager-api .
docker run -p 8000:8000 task-manager-api
```

## API Endpoints

### Документация
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Endpoints

- `GET /api/tasks/` - Получить все задачи (опциональный query параметр `status`)
- `GET /api/tasks/{id}` - Получить задачу по ID
- `POST /api/tasks/` - Создать задачу
- `PUT /api/tasks/{id}` - Обновить задачу
- `DELETE /api/tasks/{id}` - Удалить задачу

### Примеры запросов

**Создание задачи:**
```bash
curl -X POST "http://localhost:8000/api/tasks/" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Новая задача",
    "description": "Описание задачи",
    "status": "pending"
  }'
```

**Получение всех задач:**
```bash
curl "http://localhost:8000/api/tasks/"
```

**Фильтрация по статусу:**
```bash
curl "http://localhost:8000/api/tasks/?status=pending"
```

## Миграции

Создание миграции:
```bash
alembic revision --autogenerate -m "Initial migration"
```

Применение миграций:
```bash
alembic upgrade head
```

## Тесты

Запуск тестов:
```bash
pytest
```

## Технологии

- FastAPI - веб-фреймворк
- SQLAlchemy - ORM
- Alembic - миграции
- Pydantic - валидация данных
- SQLite - база данных (по умолчанию)

