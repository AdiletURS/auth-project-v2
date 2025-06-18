require('dotenv').config();
const cors = require('cors');
const express = require('express');
const setupSwagger = require('./swagger');
// Импортируем наш модуль для работы с БД
const bcrypt = require('bcryptjs');
const db = require('./db');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./authMiddleware');

const Joi = require('joi');
const validationMiddleware = require('./validationMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;
const logger = require('./logger');
setupSwagger(app);

app.use(cors());
app.use(express.json());

const registerSchema = Joi.object({
    login: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required(),
});

// Простая асинхронная функция для проверки подключения к БД
const checkDbConnection = async () => {
    try {
        // Выполняем простой запрос, чтобы проверить, что соединение установлено
        const result = await db.query('SELECT NOW()');
        logger.info('Подключение к базе данных успешно! Текущее время в БД:', result.rows[0].now);
    } catch (error) {
        logger.info('Ошибка подключения к базе данных:', error);
        // Если не удалось подключиться, завершаем работу приложения, т.к. без БД оно бесполезно
        process.exit(1);
    }
};

app.get('/', (req, res) => {
    res.send('Бэкенд для системы авторизации работает!');
});

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Получение профиля пользователя
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Данные профиля пользователя
 *       401:
 *         description: Пользователь не авторизован
 */
// --- НАШ НОВЫЙ ЗАЩИЩЕННЫЙ МАРШРУТ ---
app.get('/api/profile', authMiddleware, async (req, res) => {
    try {
        // Благодаря middleware, у нас есть доступ к req.user
        const userId = req.user.id;

        // Получаем данные пользователя из БД, но уже без хеша пароля
        const userResult = await db.query('SELECT id, login, created_at FROM users WHERE id = $1', [userId]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        res.json(userResult.rows[0]);

    } catch (error) {
        logger.info('Ошибка при получении профиля:', error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
});

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - password
 *             properties:
 *               login:
 *                 type: string
 *                 example: user1
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Пользователь успешно зарегистрирован
 *       409:
 *         description: Пользователь с таким логином уже существует
 */
// --- НАШ НОВЫЙ ENDPOINT РЕГИСТРАЦИИ ---
app.post('/api/register',  validationMiddleware(registerSchema), async (req, res) => {
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
        logger.info('Ошибка при регистрации:', error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
});

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Авторизация пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - password
 *             properties:
 *               login:
 *                 type: string
 *                 example: user1
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Успешный вход, возвращает access и refresh токены
 *       401:
 *         description: Неверные учетные данные
 */
// --- НАШ НОВЫЙ ENDPOINT ВХОДА ---
app.post('/api/login', validationMiddleware(loginSchema), async (req, res) => {
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
            { expiresIn: '1h' }
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
        logger.info('Ошибка при входе:', error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
});

/**
 * @swagger
 * /api/refresh:
 *   post:
 *     summary: Обновление access токена
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Новый access токен выдан
 *       403:
 *         description: Неверный или просроченный refresh токен
 */
// --- НАШ НОВЫЙ ENDPOINT ОБНОВЛЕНИЯ ТОКЕНА ---
app.post('/api/refresh', async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh токен не предоставлен" });
        }

        // 1. Верифицируем refresh токен
        let userData;
        try {
            userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        } catch (e) {
            // Если ошибка верификации (неверная подпись, истек срок)
            return res.status(403).json({ message: "Refresh токен недействителен или истек" });
        }

        // 2. Проверяем, что пользователь из токена все еще существует
        const userResult = await db.query('SELECT * FROM users WHERE id = $1', [userData.id]);
        if (userResult.rows.length === 0) {
            return res.status(403).json({ message: "Пользователь, связанный с токеном, не найден" });
        }
        const user = userResult.rows[0];

        // 3. Генерируем новую пару токенов
        const payload = { id: user.id, login: user.login };

        const newAccessToken = jwt.sign(
            payload,
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: '1h' }
        );

        const newRefreshToken = jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' }
        );

        // 4. Отправляем новые токены
        res.json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });

    } catch (error) {
        logger.info('Ошибка при обновлении токена:', error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
});

// Запускаем сервер и предварительно проверяем подключение к БД
const startServer = async () => {
    await checkDbConnection();
    app.listen(PORT, () => {
        logger.info(`Сервер успешно запущен на порту ${PORT}`);
    });
};

startServer();
