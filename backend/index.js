// backend/index.js

const express = require('express');
// Импортируем наш модуль для работы с БД
const bcrypt = require('bcryptjs');
const db = require('./db');
const jwt = require('jsonwebtoken');

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


// --- НАШ НОВЫЙ ENDPOINT ВХОДА ---
app.post('/api/login', async (req, res) => {
    try {
        const { login, password } = req.body;
        if (!login || !password) {
            return res.status(400).json({ message: "Логин и пароль не могут быть пустыми" });
        }

        // 1. Ищем пользователя в базе
        const userResult = await db.query('SELECT * FROM users WHERE login = $1', [login]);
        if (userResult.rows.length === 0) {
            // Важно: не говорим "пользователь не найден". Говорим общую ошибку для безопасности.
            return res.status(401).json({ message: "Неверные учетные данные" });
        }
        const user = userResult.rows[0];

        // 2. Сравниваем предоставленный пароль с хешем в базе
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Неверные учетные данные" });
        }

        // 3. Генерируем токены
        const payload = { id: user.id, login: user.login };

        const accessToken = jwt.sign(
            payload,
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: '10m' } // 10 минут
        );

        const refreshToken = jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' } // 7 дней
        );

        // 4. Отправляем токены пользователю
        res.json({
            message: "Вход выполнен успешно",
            accessToken,
            refreshToken
        });

    } catch (error) {
        console.error('Ошибка при входе:', error);
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