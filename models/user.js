const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  todos: [
    {
      todoId: { type: mongoose.Schema.Types.ObjectId, ref: 'todos' },
      todo: { type: String },
      created: { type: Date, default: Date.now() }
    }
  ]
});

userSchema.statics.EncryptPassword = async function(password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

module.exports = mongoose.model('User', userSchema);
