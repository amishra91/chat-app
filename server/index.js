const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser} = require('./users');

const port = process.env.port || 3001;
const app = express();
const server = http.createServer(app);
const router = require('./router');
const users = require('./users');
const io = socketio(server);

io.on('connection', (socket) => {
  socket.on('join', ({name}) => {
    const { user } = addUser({ id: socket.id, name });
    socket.join(user.name);
  });
  socket.on('sendMessage', (message, messageTime) => {
    const user = getUser(socket.id);
    io.emit('message', {user: user.name, text: message, time: messageTime});
  });
  socket.on('disconnect', () => {
    removeUser(socket.id);
  });
});

app.use(router);
server.listen(port, () => {
  console.log('server is running on ',port);
});