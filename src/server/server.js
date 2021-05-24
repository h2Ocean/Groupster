const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const app = require('express')();
const cors = require('cors');
const typeDefs = require('./schemas').default;
const index = require('./routes/index ').default;

require('dotenv').config();

const port = process.env.PORT;
const url = 'mongodb://localhost:27017/groupster';

const startServer = async () => {
  app.use(index);
  app.use(cors);
  const server = new ApolloServer({
    typeDefs,
    cors: true,
  });
  server.applyMiddleware({ app });
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  const httpServer = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}${server.graphqlPath}`);
  });
  const io = socketIo(httpServer, {
    cors: {
      origin: 'http://localhost:4001',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    socket.on('join', (data) => {
      socket.join(data);
      console.log(`User Joined room: ${data}`);
    });

    socket.on('send_message', (data) => {
      socket.to(data.room).emit('receive_message', data.content);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

startServer();
