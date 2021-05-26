/* eslint-disable no-underscore-dangle */
import { gql } from 'apollo-server-express';
import Profile from '../../models/profile/profile';

export const typeDef = gql`
  type Profile {
    username: String!
    name: String!
    pfp: String!
    email: String!
    orgs: [Organization]
    age: Int!
    channels: [Channel]
  }
  extend type Query {
    getChats(email: String!): [Profile]
  }

  input InputUser {
    name: String!
    email: String!
    username: String!
    age: String!
  }

  extend type Mutation {
    createProfile(message: InputUser!): Profile!
  }
`;

export const resolvers = {
  Query: {
    async getProfile(_, email) {
      try {
        const profile = await Profile.find({ email });
        return profile;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    // prettier dis
    createProfile: async (_, { profile: { name, email, username, age } }) => {
      const user = new Profile({
        name,
        email,
        username,
        age,
      });
      const res = await user.save();
      return {
        id: res._id,
        name: res.name,
        email: res.email,
        username: res.username,
        age: res.age,
      };
    },
  },
};
