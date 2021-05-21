import { gql } from 'apollo-server-express';

const profileSchema = gql`
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
export default profileSchema;
