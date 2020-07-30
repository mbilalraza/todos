const express = require('express');
const router = express.Router();

const todo = require('../controllers/todo');
const auth = require('../Helpers/auth');

router.get('/', auth.VerifyToken, todo.GetAllTodos);
router.get('/:id', auth.VerifyToken, todo.GetTodo);
router.get('/user', auth.VerifyToken, todo.GetTodoByUser);
router.post('/add', auth.VerifyToken, todo.AddTodo);
router.put('/edit/:id', auth.VerifyToken, todo.EditTodo);
router.delete('/remove/:id', auth.VerifyToken, todo.RemoveTodo);

module.exports = router;
