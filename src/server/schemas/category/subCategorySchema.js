import { gql } from 'apollo-server-express';

const SubCategorySchema = gql`
  type SubCategory {
    id: ID!
    name: String!
    channels: [Channel]
  }
`;
export default SubCategorySchema;
