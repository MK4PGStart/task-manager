#!/bin/sh
# Применяем миграции
alembic upgrade head

# Запускаем сервер
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

