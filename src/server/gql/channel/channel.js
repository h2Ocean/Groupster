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
    admin: [Profile]
    users: [Profile]
    rooms: [String]
  }
  input InputChannel {
    strId: String!
    name: String!
    category: String!
  }

  input InputGetChannel {
    strId: String!
    getAll: Boolean!
  }

  extend type Query {
    getChannel(strId: InputGetChannel!): Channel!
  }

  input InputRoom {
    strId: String!
    room: String!
  }

  extend type Mutation {
    createChannel(channel: InputChannel!): Channel!
    addUser(email: String!): Profile!
    addRoom(value: InputRoom!): Channel!
  }
`;

export const resolvers = {
  Query: {
    async getChannel(_, { strId, getAll }) {
      try {
        if (!getAll) {
          const channel = await Channel.find({ strId });
          return {
            id: channel[0]._id,
            strId: channel[0].strId,
            name: channel[0].name,
            category: channel[0].category,
            admin: channel[0].admin,
            rooms: channel[0].rooms,
            users: channel[0].users,
          };
        }
        const channel = await Channel.find();
        return channel;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    // prettier dis
    createChannel: async (_, { channel: { strId, name, category } }) => {
      const chan = new Channel({
        strId,
        name: name.toLowerCase(),
        category: category.toLowerCase(),
      });
      const res = await chan.save();

      return {
        id: res._id,
        strId: res.strId,
        name: res.name,
        category: res.category,
      };
    },
    addUser: async (_, { value: { strId, email } }) => {
      const profile = await Profile.find({ email });
      const res = await Channel.updateOne({ strId }, { $push: { users: profile } });
      return {
        id: res._id,
        strId: res.strId,
        name: res.name,
        category: res.category,
        users: res.users,
      };
    },
    addRoom: async (_, { value: { strId, room } }) => {
      const res = await Channel.updateOne({ strId }, { $push: { rooms: room } });
      return {
        id: res._id,
        strId: res.strId,
        name: res.name,
        category: res.category,
        users: res.users,
        rooms: res.rooms,
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
