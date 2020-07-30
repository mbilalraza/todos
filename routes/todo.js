const express = require('express');
const router = express.Router();

const todo = require('../controllers/todo');
const auth = require('../Helpers/auth');

router.get('/', auth.VerifyToken, todo.GetAllTodos);
router.get('/:id', auth.VerifyToken, todo.GetTodo);
router.post('/add', auth.VerifyToken, todo.AddTodo);

module.exports = router;
