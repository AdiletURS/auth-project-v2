// backend/authMiddleware.js
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    // Получаем заголовок Authorization. 'OPTIONS' - это предварительный запрос, который шлют браузеры, его надо пропускать.
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        // Формат заголовка: "Bearer TOKEN"
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Пользователь не авторизован" });
        }

        // Верифицируем токен
        const decodedData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        // Добавляем декодированные данные (payload) в объект запроса
        req.user = decodedData;
        next(); // Передаем управление дальше

    } catch (e) {
        return res.status(401).json({ message: "Пользователь не авторизован" });
    }
}

module.exports = authMiddleware;