// services/auth-service/validationMiddleware.js (и такой же в todo-service)
const Joi = require('joi');

const validationMiddleware = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            // Если есть ошибка валидации, отправляем 400 Bad Request с деталями
            return res.status(400).json({
                message: 'Ошибка валидации',
                details: error.details.map(d => d.message).join(', '),
            });
        }
        next();
    };
};

module.exports = validationMiddleware;