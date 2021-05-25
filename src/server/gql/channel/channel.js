import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type UserData {
    nick: String!
    profile: Profile!
    role: Role!
  }
  type Channel {
    id: ID!
    name: String!
    desc: String!
    category: Category!
    roles: [Role]!
    admin: [Profile]!
    owner: Profile!
    org: Organization!
    users: [UserData]!
  }
`;
