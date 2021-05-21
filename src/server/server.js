import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import typeDefs from './schemas';

require('dotenv').config();

const port = process.env.PORT;

const url = 'mongodb://localhost:27017/groupster';

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    cors: true,
  });

  server.applyMiddleware({ app });

  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}${server.graphqlPath}`);
  });

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  });
};

startServer();
