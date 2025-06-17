// services/todo-service/index.js
require('dotenv').config();
const express = require('express');
const db = require('./db');
const authMiddleware = require('./authMiddleware');
const logger = require('./logger');

const Joi = require('joi');
const validationMiddleware = require('./validationMiddleware');

const app = express();
const PORT = process.env.TODO_SERVICE_PORT || 3001;
app.use(express.json());

// Схемы валидации для ToDo Service
const todoSchema = Joi.object({
    title: Joi.string().min(1).required(),
    completed: Joi.boolean().optional(), // optional() делает поле необязательным
});

// Все маршруты ниже будут защищены. Сначала сработает authMiddleware.
app.use('/api/todos', authMiddleware);

// CREATE: Создать новую задачу
app.post('/api/todos', validationMiddleware(todoSchema), async (req, res) => {
    const { title } = req.body;
    const userId = req.user.id; // ID пользователя мы берем из токена!

    if (!title) {
        return res.status(400).json({ message: "Заголовок задачи не может быть пустым" });
    }

    try {
        const newTodo = await db.query(
            'INSERT INTO todos (title, user_id) VALUES ($1, $2) RETURNING *',
            [title, userId]
        );
        res.status(201).json(newTodo.rows[0]);
    } catch (e) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

// При обновлении title не обязателен, если мы хотим поменять только completed
const updateTodoSchema = Joi.object({
    title: Joi.string().min(1),
    completed: Joi.boolean()
});

// READ: Получить все задачи пользователя
app.get('/api/todos', async (req, res) => {
    const userId = req.user.id;
    try {
        const todos = await db.query('SELECT * FROM todos WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
        res.json(todos.rows);
    } catch (e) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

// UPDATE: Обновить задачу
app.put('/api/todos/:id',  validationMiddleware(updateTodoSchema), async (req, res) => {
    const todoId = req.params.id;
    const userId = req.user.id;
    const { title, completed } = req.body;

    try {
        const updatedTodo = await db.query(
            'UPDATE todos SET title = $1, completed = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
            [title, completed, todoId, userId]
        );
        if (updatedTodo.rows.length === 0) {
            return res.status(404).json({ message: "Задача не найдена или у вас нет прав на ее редактирование" });
        }
        res.json(updatedTodo.rows[0]);
    } catch (e) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

// DELETE: Удалить задачу
app.delete('/api/todos/:id', async (req, res) => {
    const todoId = req.params.id;
    const userId = req.user.id;
    try {
        const result = await db.query(
            'DELETE FROM todos WHERE id = $1 AND user_id = $2',
            [todoId, userId]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Задача не найдена или у вас нет прав на ее удаление" });
        }
        res.status(204).send(); // 204 No Content - успешное удаление
    } catch (e) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
});


app.listen(PORT, () => {
    logger.info(`ToDo-сервис запущен на порту ${PORT}`);
});