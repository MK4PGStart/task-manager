package com.taskmanager;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.*;

/**
 * UI тесты для Task Manager приложения
 */
public class TaskManagerUITest {
    private WebDriver driver;
    private WebDriverWait wait;
    private static final String BASE_URL = "http://localhost:3000";

    @BeforeEach
    public void setUp() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless"); // Для CI/CD
        driver = new ChromeDriver(options);
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get(BASE_URL);
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    public void testPageTitle() {
        String title = driver.getTitle();
        assertNotNull(title);
    }

    @Test
    public void testAddTask() {
        WebElement titleInput = wait.until(
            ExpectedConditions.presenceOfElementLocated(By.id("title"))
        );
        WebElement descriptionInput = driver.findElement(By.id("description"));
        WebElement submitButton = driver.findElement(
            By.xpath("//button[contains(text(), 'Добавить задачу')]")
        );

        titleInput.sendKeys("Тестовая задача");
        descriptionInput.sendKeys("Описание тестовой задачи");
        submitButton.click();

        WebElement taskTitle = wait.until(
            ExpectedConditions.presenceOfElementLocated(
                By.xpath("//h3[contains(text(), 'Тестовая задача')]")
            )
        );
        assertTrue(taskTitle.isDisplayed());
    }

    @Test
    public void testFilterTasks() {
        WebElement allTasksButton = wait.until(
            ExpectedConditions.elementToBeClickable(
                By.xpath("//button[contains(text(), 'Все задачи')]")
            )
        );
        assertTrue(allTasksButton.isDisplayed());
        allTasksButton.click();
    }
}

