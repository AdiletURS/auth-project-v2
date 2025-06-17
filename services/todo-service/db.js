// auth-service/db.js

// Импортируем класс Pool из библиотеки pg
const { Pool } = require('pg');

// Создаем новый экземпляр пула соединений
const pool = new Pool({
    // Данные для подключения берутся из переменных окружения,
    // которые мы определили в docker-compose.yml
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Экспортируем объект с методом query.
// Теперь из других файлов мы сможем вызывать db.query(...) для выполнения запросов
module.exports = {
    query: (text, params) => pool.query(text, params),
};