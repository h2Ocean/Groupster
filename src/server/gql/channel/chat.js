/* eslint-disable no-underscore-dangle */
import { gql } from 'apollo-server-express';
import Chat from '../../models/channel/chat';

export const typeDef = gql`
  type Chat {
    id: ID!
    name: String!
    nick: String!
    msg: String!
    created: String!
    room: String!
  }

  extend type Query {
    getChats(room: String!): [Chat]
  }

  input InputMessage {
    name: String!
    nick: String!
    msg: String!
    room: String!
  }

  extend type Mutation {
    sendMessage(message: InputMessage!): Chat!
  }
`;

export const resolvers = {
  Query: {
    async getChats(_, { room }) {
      try {
        const chats = await Chat.find({ room });
        return chats;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    // prettier dis
    sendMessage: async (_, { message: { name, nick, msg } }) => {
      const message = new Chat({
        name,
        nick,
        msg,
        created: new Date().toISOString(),
      });
      const res = await message.save();
      return {
        id: res._id,
        name: res.name,
        nick: res.nick,
        msg: res.msg,
        room: res.room,
        created: res.created,
      };
    },
  },
};
