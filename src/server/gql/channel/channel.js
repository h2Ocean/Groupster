/* eslint-disable no-underscore-dangle */
import { gql } from 'apollo-server-express';
import Channel from '../../models/channel/channel';
import Profile from '../../models/profile/profile';

export const typeDef = gql`
  type Channel {
    id: ID!
    strId: String!
    name: String!
    category: String!
    admin: [Profile]!
    users: [Profile]!
  }
  input InputChannel {
    strId: String!
    name: String!
    category: String!
  }

  extend type Query {
    getChannel(strId: String!): [Channel]
  }

  extend type Mutation {
    createChannel(channel: InputChannel!): Chanel!
    addUser(email: String!): Profile!
  }
`;

export const resolvers = {
  Query: {
    async getChannel(_, { strId }) {
      try {
        const channel = await Channel.find({ strId });
        return channel;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    // prettier dis
    createChannel: async (_, { channel: { strId, name, category } }) => {
      const channel = new Channel({
        strId,
        name: name.toLowerCase(),
        category: category.toLowerCase(),
      });
      const res = await channel.save();

      return {
        id: res._id,
        strId: res.strId,
        name: res.name,
        category: res.category,
      };
    },
    addUser: async (_, { value: { _id, email } }) => {
      const profile = await Profile.find({ email });
      const res = await Channel.updateOne({ _id }, { $push: { users: profile } });
      return {
        id: res._id,
        strId: res.strId,
        name: res.name,
        category: res.category,
        users: res.users,
      };
    },
  },
};

// type Channel {
//   id: ID!
//   name: String!
//   desc: String!
//   category: Category!
//   roles: [Role]!
//   admin: [Profile]!
//   owner: Profile!
//   org: Organization!
//   users: [UserData]!
// }
