import { gql } from 'apollo-server-express';

const channelSchema = gql`
  type Channel {
    id: ID!
    name: String!
    desc: String!
    category: Category
    subCategory: SubCategory
    roles: [Role]
    admin: [Profile]
    owner: Profile
    org: Organization
    users: [UserData]
  }

  type UserData {
    Nick: String
    profile: Profile
    role: Role
  }
`;
export default channelSchema;
