const { gql } = require('apollo-server-express');
const { merge } = require('lodash');
const { makeExecutableSchema } = require('apollo-server');
const { typeDef: Channel, resolvers: channelResolvers } = require('./channel');
const { typeDef: Chat, resolvers: chatResolvers } = require('./chat');
const { typeDef: Profile, resolvers: profileResolvers } = require('./profile');

const Query = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;
const resolvers = {};
const schema = makeExecutableSchema({
  typeDefs: [Query, Channel, Chat, Profile],
  resolvers: merge(resolvers, channelResolvers, chatResolvers, profileResolvers),
});

module.exports = schema;
