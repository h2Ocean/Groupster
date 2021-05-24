import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type Profile {
    username: String!
    name: String!
    pfp: String!
    email: String!
    orgs: [Organization]
    age: Int!
    channels: [Channel]
  }
`;
