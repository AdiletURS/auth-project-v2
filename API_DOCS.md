# API Документация для проекта ToDo App

## Введение

Эта документация описывает API для двух микросервисов: **Auth Service** и **ToDo Service**.
Система использует JWT-аутентификацию с парой `access` и `refresh` токенов.

* **Auth Service Base URL:** `http://localhost:3000`
* **ToDo Service Base URL:** `http://localhost:3001`

---

## Аутентификация (Общий флоу)

1.  **Регистрация/Вход:** Клиент отправляет запрос на `/api/register` или `/api/login` на **Auth Service**.
2.  **Получение токенов:** В случае успеха, Auth Service возвращает пару токенов: `accessToken` (срок жизни 1 час) и `refreshToken`.
3.  **Хранение токенов:** Клиент должен безопасно сохранить оба токена.
4.  **Авторизованные запросы:** При каждом запросе к защищенным эндпоинтам (на **любом** из сервисов) клиент должен передавать `accessToken` в заголовке:
    `Authorization: Bearer <ваш_accessToken>`
5.  **Истечение `accessToken`:** Если `accessToken` истек, сервер вернет ошибку `401 Unauthorized`.
6.  **Обновление токенов:** Получив ошибку `401`, клиент **не должен** перенаправлять пользователя на страницу входа. Вместо этого он должен:
    a. Отправить `refreshToken` на эндпоинт `/api/refresh` **Auth Service**.
    b. В случае успеха, Auth Service вернет **новую пару** `accessToken` и `refreshToken`.
    c. Клиент должен заменить свои старые токены на новые.
    d. Повторить изначальный запрос, который провалился с ошибкой `401`.
7.  **Истечение `refreshToken`:** Если запрос на `/api/refresh` провалился (ошибка `403 Forbidden`), это означает, что сессия пользователя окончательно истекла. В этом случае необходимо перенаправить пользователя на страницу входа.

---

## API Reference

### Auth Service (`http://localhost:3000`)

#### **[POST] /api/register**
Регистрация нового пользователя.

* **Request Body:** `application/json`
    ```json
    {
      "login": "user123",
      "password": "password123"
    }
    ```
* **Validation Rules:**
    * `login`: string, min 3, max 30, required
    * `password`: string, min 6, required
* **Success Response (201 Created):**
    ```json
    {
        "message": "Пользователь успешно зарегистрирован",
        "user": {
            "id": 1,
            "login": "user123"
        }
    }
    ```
* **Error Responses:**
    * `400 Bad Request`: Ошибка валидации.
    * `409 Conflict`: Пользователь с таким логином уже существует.

---
#### **[POST] /api/login**
Вход пользователя и получение токенов.

* **Request Body:** `application/json` (аналогично регистрации)
* **Success Response (200 OK):**
    ```json
    {
      "message": "Вход выполнен успешно",
      "accessToken": "eyJ...",
      "refreshToken": "eyJ..."
    }
    ```
* **Error Responses:**
    * `401 Unauthorized`: Неверные учетные данные.

---
#### **[POST] /api/refresh**
Обновление пары токенов с помощью `refreshToken`.

* **Request Body:** `application/json`
    ```json
    {
      "refreshToken": "eyJ..."
    }
    ```
* **Success Response (200 OK):**
    ```json
    {
      "accessToken": "eyJ... (новый)",
      "refreshToken": "eyJ... (новый)"
    }
    ```
* **Error Responses:**
    * `403 Forbidden`: `refreshToken` недействителен или истек.

---
### ToDo Service (`http://localhost:3001`)
**Все эндпоинты требуют заголовок `Authorization: Bearer <accessToken>`**

#### **[POST] /api/todos**
Создание новой задачи.

* **Request Body:** `application/json`
    ```json
    {
      "title": "Закончить тестовое задание"
    }
    ```
* **Validation Rules:**
    * `title`: string, min 1, required
* **Success Response (201 Created):**
    ```json
    {
        "id": 1,
        "title": "Закончить тестовое задание",
        "completed": false,
        "user_id": 5,
        "created_at": "2025-06-17T10:30:00.000Z"
    }
    ```

---
#### **[GET] /api/todos**
Получение списка всех задач текущего пользователя.

* **Success Response (200 OK):**
    ```json
    [
      {
          "id": 1,
          "title": "Закончить тестовое задание",
          "completed": false,
          "user_id": 5,
          "created_at": "2025-06-17T10:30:00.000Z"
      }
    ]
    ```

---
#### **[PUT] /api/todos/:id**
Обновление задачи по ее `id`.

* **Request Body:** `application/json`
    ```json
    {
      "title": "Закончить и проверить тестовое задание",
      "completed": true
    }
    ```
* **Validation Rules:**
    * `title`: string, min 1, optional
    * `completed`: boolean, optional
* **Success Response (200 OK):** Возвращает обновленный объект задачи.
* **Error Responses:**
    * `404 Not Found`: Задача не найдена или принадлежит другому пользователю.

---
#### **[DELETE] /api/todos/:id**
Удаление задачи по ее `id`.

* **Success Response (204 No Content):** Пустое тело ответа.
* **Error Responses:**
    * `404 Not Found`: Задача не найдена или принадлежит другому пользователю.