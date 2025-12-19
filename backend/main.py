from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import tasks
from app.database import engine, Base

# Создаем таблицы
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Task Manager API",
    description="REST API для управления задачами",
    version="1.0.0"
)

# Настройка CORS для работы с React фронтендом
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:80"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключаем роутеры
app.include_router(tasks.router, prefix="/api/tasks", tags=["tasks"])

@app.get("/")
async def root():
    return {"message": "Task Manager API", "version": "1.0.0"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

