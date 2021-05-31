/* eslint-disable no-underscore-dangle */
import { gql } from 'apollo-server-express';
import Profile from '../../models/profile/profile';

export const typeDef = gql`
  type Profile {
    id: ID!
    name: String!
    username: String!
    email: String!
    age: Int!
    bio: String
    pfp: String
  }

  extend type Query {
    getProfile(email: String!): [Profile]
  }

  input InputUser {
    name: String!
    email: String!
    username: String!
    age: Int!
  }

  input UpdateBio {
    name: String
    email: String
    bio: String
    pfp: String
  }

  extend type Mutation {
    createProfile(profile: InputUser!): Profile!
    updateBio(info: UpdateBio!): Profile!
  }
`;

export const resolvers = {
  Query: {
    async getProfile(_, { email }) {
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
        email: email.toLowerCase(),
        username: username.toLowerCase(),
        age: parseInt(age, 10),
      });
      const res = await user.save();

      return {
        id: res._id,
        name: res.name,
        email: res.email,
        username: res.username,
        age: res.age,
        bio: res.bio,
      };
    },
    updateBio: async (_, { info: { name, bio, email, pfp } }) => {
      const res = await Profile.findOneAndUpdate({ email }, { bio, name, pfp });
      console.log(res);
      return {
        id: res._id,
        name: res.name,
        email: res.email,
        username: res.username,
        age: res.age,
        bio: res.bio,
        pfp: res.pfp,
      };
    },
  },
};
