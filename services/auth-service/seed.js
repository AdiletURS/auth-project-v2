// services/auth-service/seed.js
require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('./db');

async function seed() {
    try {
        console.log('Начинаем наполнение базы данных...');

        // Проверяем, есть ли уже пользователи
        const usersCheck = await db.query('SELECT * FROM users');
        if (usersCheck.rows.length > 0) {
            console.log('База данных уже содержит данные. Наполнение не требуется.');
            return;
        }

        // Создаем тестового пользователя
        const login = 'testuser';
        const password = 'testpassword';
        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query(
            'INSERT INTO users (login, password_hash) VALUES ($1, $2)',
            [login, hashedPassword]
        );

        console.log(`Пользователь '<span class="math-inline">\{login\}' с паролем '</span>{password}' успешно создан.`);
        console.log('Наполнение базы данных завершено.');

    } catch (error) {
        console.error('Ошибка при наполнении базы данных:', error);
    } finally {
        // Важно: в реальном скрипте здесь нужно было бы закрыть соединение с БД,
        // но наш db-модуль использует пул, поэтому мы просто завершаем процесс.
        process.exit();
    }
}

seed();