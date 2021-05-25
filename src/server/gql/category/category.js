import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type Category {
    id: ID!
    name: String!
    channels: [Channel]
  }
`;
