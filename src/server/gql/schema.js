import { gql } from 'apollo-server-express';
import { merge } from 'lodash';
import { makeExecutableSchema } from 'apollo-server';
import { typeDef as Category } from './category/category';
import { typeDef as Channel, resolvers as channelResolvers } from './channel/channel';
import { typeDef as Chat, resolvers as chatResolvers } from './channel/chat';
import { typeDef as Role } from './channel/role';
import { typeDef as Organization } from './profile/organization';
import { typeDef as Profile, resolvers as profileResolvers } from './profile/profile';

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
  typeDefs: [Query, Category, Channel, Chat, Role, Organization, Profile],
  resolvers: merge(resolvers, channelResolvers, chatResolvers, profileResolvers),
});

export default schema;
