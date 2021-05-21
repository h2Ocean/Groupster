import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

const port = process.env.PORT || 4000;

const url = 'mongodb://localhost:27017/groupster';

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
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
