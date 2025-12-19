# Автотесты для Task Manager

Директория содержит автотесты для приложения Task Manager на двух языках программирования.

## Структура

```
autotests/
├── java/          # Тесты на Java
│   ├── src/
│   │   └── test/
│   │       └── java/
│   │           └── com/
│   │               └── taskmanager/
│   │                   └── TaskManagerUITest.java
│   └── pom.xml
│
└── python/        # Тесты на Python
    ├── tests/
    │   └── test_task_manager_ui.py
    ├── requirements.txt
    └── pytest.ini
```

## Java тесты

### Требования
- Java 11+
- Maven 3.6+

### Запуск
```bash
cd autotests/java
mvn test
```

### Используемые технологии
- JUnit 5
- Selenium WebDriver
- WebDriverManager

## Python тесты

### Требования
- Python 3.8+
- pip

### Установка зависимостей
```bash
cd autotests/python
pip install -r requirements.txt
```

### Запуск
```bash
pytest
```

### Используемые технологии
- pytest
- Selenium WebDriver
- webdriver-manager

## Примечания

- Перед запуском тестов убедитесь, что приложение запущено на `http://localhost:3000`
- Для CI/CD можно использовать headless режим браузера
- Настройте BASE_URL в тестах под ваше окружение

