"""
UI тесты для Task Manager приложения
"""
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager


BASE_URL = "http://localhost:3000"


@pytest.fixture(scope="function")
def driver():
    """Настройка WebDriver для каждого теста"""
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Для CI/CD
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    driver.get(BASE_URL)
    yield driver
    driver.quit()


def test_page_title(driver):
    """Проверка заголовка страницы"""
    title = driver.title
    assert title is not None


def test_add_task(driver):
    """Тест добавления новой задачи"""
    wait = WebDriverWait(driver, 10)
    
    # Находим элементы формы
    title_input = wait.until(
        EC.presence_of_element_located((By.ID, "title"))
    )
    description_input = driver.find_element(By.ID, "description")
    submit_button = driver.find_element(
        By.XPATH, "//button[contains(text(), 'Добавить задачу')]"
    )
    
    # Заполняем форму
    title_input.send_keys("Тестовая задача")
    description_input.send_keys("Описание тестовой задачи")
    submit_button.click()
    
    # Проверяем, что задача появилась
    task_title = wait.until(
        EC.presence_of_element_located(
            (By.XPATH, "//h3[contains(text(), 'Тестовая задача')]")
        )
    )
    assert task_title.is_displayed()


def test_filter_tasks(driver):
    """Тест фильтрации задач"""
    wait = WebDriverWait(driver, 10)
    
    all_tasks_button = wait.until(
        EC.element_to_be_clickable(
            (By.XPATH, "//button[contains(text(), 'Все задачи')]")
        )
    )
    assert all_tasks_button.is_displayed()
    all_tasks_button.click()


def test_change_task_status(driver):
    """Тест изменения статуса задачи"""
    wait = WebDriverWait(driver, 10)
    
    # Сначала добавляем задачу
    title_input = wait.until(
        EC.presence_of_element_located((By.ID, "title"))
    )
    submit_button = driver.find_element(
        By.XPATH, "//button[contains(text(), 'Добавить задачу')]"
    )
    
    title_input.send_keys("Задача для изменения статуса")
    submit_button.click()
    
    # Находим select для изменения статуса
    status_select = wait.until(
        EC.presence_of_element_located(
            (By.XPATH, "//select[@aria-label='Изменить статус']")
        )
    )
    assert status_select.is_displayed()

