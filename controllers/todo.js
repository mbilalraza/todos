const Joi = require('joi');
const HttpStatus = require('http-status-codes');
const todos = require('../models/todos');
const User = require('../models/user');

module.exports = {
  AddTodo(req, res) {
    const schema = Joi.object().keys({
      todo: Joi.string().required()
    });
    const body = {
      todo: req.body.todo
    };
    const { error } = Joi.validate(body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details });
    }
    const bodyObj = {
      user: req.user._id,
      username: req.user.username,
      todo: req.body.todo,
      created: new Date()
    };
    todos.create(bodyObj)
      .then(async todo => {
        await User.update(
          {
            _id: req.user._id
          },
          {
            $push: {
              todos: {
                todoId: todo._id,
                todo: req.body.todo,
                created: new Date()
              }
            }
          }
        );
        res.status(HttpStatus.OK).json({ message: 'Todo created', todo });
      })
      .catch(err => {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Error occured' });
      });
  },
  async GetAllTodos(req, res) {
    try {
      const todos = await todos.find({})
        .populate('user')
        .sort({ created: -1 });
      return res
        .status(HttpStatus.OK)
        .json({ message: 'All todos', todos });
    } catch (err) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error occured' });
    }
  },
  async GetTodo(req, res) {
    await todos.findOne({ _id: req.params.id })
      .populate('user')
      .then(todo => {
        res.status(HttpStatus.OK).json({ message: 'todo found', todo });
      })
      .catch(err =>
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'todo not found', todo })
      );
  }
};
