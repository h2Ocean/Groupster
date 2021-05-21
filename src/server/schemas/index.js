import { gql } from 'apollo-server-express';
import categorySchema from './category/categorySchema';
import subCategorySchema from './category/subCategorySchema';
import channelSchema from './channel/channelSchema';
import roleSchema from './channel/roleSchema';
import profileSchema from './profile/profileSchema';
import organizationSchema from './profile/organizationSchema';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [
  linkSchema,
  categorySchema,
  subCategorySchema,
  channelSchema,
  roleSchema,
  profileSchema,
  organizationSchema,
];
