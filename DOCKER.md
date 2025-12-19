# Docker инструкции

## Сборка образа

```bash
docker build -t task-manager:latest .
```

## Запуск контейнера

```bash
docker run -d -p 3000:80 --name task-manager task-manager:latest
```

Приложение будет доступно по адресу: http://localhost:3000

## Использование docker-compose

### Запуск
```bash
docker-compose up -d
```

### Остановка
```bash
docker-compose down
```

### Просмотр логов
```bash
docker-compose logs -f
```

### Пересборка образа
```bash
docker-compose up -d --build
```

## Структура

- **Dockerfile** - многоэтапная сборка (builder + nginx)
- **nginx.conf** - конфигурация веб-сервера для SPA
- **docker-compose.yml** - оркестрация контейнера
- **.dockerignore** - исключения при сборке

## Особенности

- Используется multi-stage build для оптимизации размера образа
- Production build React приложения
- Nginx для раздачи статических файлов
- Поддержка SPA routing (все маршруты перенаправляются на index.html)
- Gzip compression для оптимизации
- Health check endpoint на /health
- Кэширование статических ресурсов

## Переменные окружения

При необходимости можно добавить переменные окружения через docker-compose.yml или при запуске:

```bash
docker run -d -p 3000:80 \
  -e NODE_ENV=production \
  --name task-manager \
  task-manager:latest
```

