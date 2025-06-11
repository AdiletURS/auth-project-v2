// backend/index.js

const express = require('express');
// Импортируем наш модуль для работы с БД
const bcrypt = require('bcryptjs');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Простая асинхронная функция для проверки подключения к БД
const checkDbConnection = async () => {
    try {
        // Выполняем простой запрос, чтобы проверить, что соединение установлено
        const result = await db.query('SELECT NOW()');
        console.log('Подключение к базе данных успешно! Текущее время в БД:', result.rows[0].now);
    } catch (error) {
        console.error('Ошибка подключения к базе данных:', error);
        // Если не удалось подключиться, завершаем работу приложения, т.к. без БД оно бесполезно
        process.exit(1);
    }
};

app.get('/', (req, res) => {
    res.send('Бэкенд для системы авторизации работает!');
});


// --- НАШ НОВЫЙ ENDPOINT РЕГИСТРАЦИИ ---
app.post('/api/register', async (req, res) => {
    try {
        const { login, password } = req.body;

        // Простая валидация
        if (!login || !password) {
            return res.status(400).json({ message: "Логин и пароль не могут быть пустыми" });
        }

        // Проверяем, не занят ли логин
        const existingUser = await db.query('SELECT * FROM users WHERE login = $1', [login]);
        if (existingUser.rows.length > 0) {
            return res.status(409).json({ message: "Пользователь с таким логином уже существует" });
        }

        // Хешируем пароль. 10 - это "сложность" хеширования (salt rounds).
        const hashedPassword = await bcrypt.hash(password, 10);

        // Сохраняем пользователя в базу данных
        const newUser = await db.query(
            'INSERT INTO users (login, password_hash) VALUES ($1, $2) RETURNING id, login',
            [login, hashedPassword]
        );

        // Отправляем успешный ответ
        res.status(201).json({
            message: "Пользователь успешно зарегистрирован",
            user: newUser.rows[0],
        });

    } catch (error) {
        console.error('Ошибка при регистрации:', error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
});


// Запускаем сервер и предварительно проверяем подключение к БД
const startServer = async () => {
    await checkDbConnection();
    app.listen(PORT, () => {
        console.log(`Сервер успешно запущен на порту ${PORT}`);
    });
};

startServer();