# Многоэтапная сборка для оптимизации размера образа

# Этап 1: Сборка приложения
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем файлы зависимостей
COPY package.json ./

# Устанавливаем зависимости и очищаем кэш
RUN npm install && npm cache clean --force

# Копируем исходный код
COPY public ./public
COPY src ./src

# Аргумент для переменной окружения API URL
ARG REACT_APP_API_URL=http://localhost:8000
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Собираем production версию
RUN npm run build

# Этап 2: Production образ с nginx
FROM nginx:alpine

# Копируем собранное приложение в nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Копируем конфигурацию nginx (опционально)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]

