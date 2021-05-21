import { gql } from 'apollo-server-express';

const roleSchema = gql`
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
export default roleSchema;
