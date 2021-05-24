import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type Role {
    id: ID!
    channel: ID!
    name: String!
    permissions: [Boolean]
  }

  type Permission {
    name: String!
    allowed: Boolean!
  }
`;
