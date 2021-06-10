const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const path = require('path');
const app = require('express')();
const schema = require('./gql/schema');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env.local') });

const port = process.env.PORT;
const pass = process.env.DB_PASSWORD;
const username = process.env.DB_USERNAME;
const url = `mongodb+srv://${username}:${pass}@cluster0.fshtv.mongodb.net/groupster?retryWrites=true&w=majority`;
const corsOptions = {
  origin: 'https://groupster-chat.herokuapp.com',
  credentials: true,
};

const startServer = async () => {
  const server = new ApolloServer({
    schema,
    cors: {
      origin: 'https://groupster-chat.herokuapp.com',
    },
    playground: true,
    introspection: true,
  });
  server.applyMiddleware({ app, cors: corsOptions });
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build/', 'index.html'));
  });

  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const httpServer = app.listen(port, () => {
    console.log(`Listening at https://groupster-chat.herokuapp.com:${port}${server.graphqlPath}`);
  });

  const io = socketIo(httpServer, {
    cors: {
      origin: 'https://groupster-chat.herokuapp.com',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    socket.on('join', (data) => {
      socket.join(data);
      console.log(`User Joined room: ${data}`);
    });

    socket.on('send_message', (data) => {
      socket.to(data.room).emit('receive_message', data);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

startServer();
