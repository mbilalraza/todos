const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(cors());

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);


require('./socket/streams')(io);

const config = require('./config/development');
const auth = require('./routes/auth');
const todo = require('./routes/todo');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
// app.use(logger('dev'));

mongoose.Promise = global.Promise;
mongoose.connect(
  config.url,
  { useNewUrlParser: true,
  useUnifiedTopology: true }
);

app.use('/api', auth);
app.use('/api/todo', todo);

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
