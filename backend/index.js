// backend/index.js

const express = require('express');
// Импортируем наш модуль для работы с БД
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

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

// Запускаем сервер и предварительно проверяем подключение к БД
const startServer = async () => {
    await checkDbConnection();
    app.listen(PORT, () => {
        console.log(`Сервер успешно запущен на порту ${PORT}`);
    });
};

startServer();