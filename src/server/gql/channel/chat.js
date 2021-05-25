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
  }

  extend type Query {
    getChats: [Chat]
  }

  input InputMessage {
    name: String!
    nick: String!
    msg: String!
  }

  extend type Mutation {
    sendMessage(message: InputMessage!): Chat!
  }
`;

export const resolvers = {
  Query: {
    async getChats() {
      try {
        const chats = await Chat.find();
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
      console.log(message);
      const res = await message.save();
      return {
        id: res._id,
        name: res.name,
        nick: res.nick,
        msg: res.msg,
        created: res.created,
      };
    },
  },
};
