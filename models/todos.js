const mongoose = require('mongoose');

const todosSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  todo: { type: String, default: '' },
  created: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('todos', todosSchema);
