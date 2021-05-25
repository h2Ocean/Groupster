import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type Organization {
    id: ID!
    name: String!
    desc: String!
    admin: [Profile]
    owner: Profile
  }
`;
