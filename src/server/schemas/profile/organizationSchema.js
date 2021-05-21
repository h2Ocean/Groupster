import { gql } from 'apollo-server-express';

const organizationSchema = gql`
  type Organization {
    id: ID!
    name: String!
    desc: String!
    admin: [Profile]
    owner: Profile
  }
`;
export default organizationSchema;
