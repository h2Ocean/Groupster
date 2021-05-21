import { gql } from 'apollo-server-express';

const categorySchema = gql`
  type Category {
    id: ID!
    name: String!
    subCategory: [SubCategory]
  }
`;
export default categorySchema;
