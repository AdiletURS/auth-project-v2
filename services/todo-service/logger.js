// services/auth-service/logger.js (и такой же в todo-service)
const winston = require('winston');

const logger = winston.createLogger({
    // Уровень логирования. Будут записываться логи этого уровня и всех, что "важнее".
    // Например, при 'info' будут писаться info, warn, error.
    level: 'info',
    // Формат логов. Мы хотим получать JSON.
    format: winston.format.combine(
        winston.format.timestamp(), // Добавить временную метку
        winston.format.json()       // Форматировать в JSON
    ),
    // Куда писать логи.
    transports: [
        // В режиме разработки для наглядности будем выводить в консоль в красивом виде
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(), // Раскрасить вывод
                winston.format.simple()    // Простой текстовый формат
            ),
        }),
    ],
});

// В будущем, для продакшена, можно добавить транспорт для записи в файл:
// logger.add(new winston.transports.File({ filename: 'error.log', level: 'error' }));
// logger.add(new winston.transports.File({ filename: 'combined.log' }));

module.exports = logger;