Документация API для системы авторизации
Привет! Вот документация по бэкенд API для авторизации.

Базовый URL: http://localhost:3000/api

Аутентификация
Все запросы к защищенным маршрутам должны содержать заголовок:
Authorization: Bearer <accessToken>

Endpoints
1. Регистрация нового пользователя

Endpoint: /register
Метод: POST
Описание: Создает нового пользователя в системе.
Тело запроса (JSON):
JSON

{
"login": "someuser",
"password": "somepassword123"
}
Успешный ответ (201 Created):
JSON

{
"message": "Пользователь успешно зарегистрирован",
"user": {
"id": 1,
"login": "someuser"
}
}
Ошибки:
400 Bad Request - если не передан логин или пароль.
409 Conflict - если пользователь с таким логином уже существует.
2. Вход пользователя в систему

Endpoint: /login
Метод: POST
Описание: Аутентифицирует пользователя и возвращает пару токенов.
Тело запроса (JSON):
JSON

{
"login": "someuser",
"password": "somepassword123"
}
Успешный ответ (200 OK):
JSON

{
"message": "Вход выполнен успешно",
"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
Ошибки:
401 Unauthorized - если неверные учетные данные.
3. Обновление токенов

Endpoint: /refresh
Метод: POST
Описание: Обменивает валидный refreshToken на новую пару токенов.
Тело запроса (JSON):
JSON

{
"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
Успешный ответ (200 OK):
JSON

{
"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (новый)",
"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (новый)"
}
Ошибки:
403 Forbidden - если refreshToken недействителен или просрочен.
4. Получение данных профиля (защищенный маршрут)

Endpoint: /profile
Метод: GET
Описание: Возвращает информацию о текущем авторизованном пользователе.
Заголовки:
Authorization: Bearer <accessToken>
Тело запроса: нет
Успешный ответ (200 OK):
JSON

{
"id": 1,
"login": "someuser",
"created_at": "2025-06-11T07:03:01.183Z"
}
Ошибки:
401 Unauthorized - если токен не предоставлен или недействителен.