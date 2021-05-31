/* eslint-disable no-underscore-dangle */
import { gql } from 'apollo-server-express';
import Chat from '../../models/channel/chat';

export const typeDef = gql`
  type Chat {
    id: ID!
    name: String!
    msg: String!
    created: String!
    room: String!
  }

  extend type Query {
    getChats(room: String!): [Chat]
  }

  input InputMessage {
    name: String!
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
        console.log(chats);
        return chats;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    // prettier dis
    sendMessage: async (_, { message: { name, msg, room } }) => {
      const message = new Chat({
        name,
        msg,
        room,
        created: new Date().toISOString(),
      });
      const res = await message.save();
      return {
        id: res._id,
        name: res.name,
        msg: res.msg,
        room: res.room,
        created: res.created,
      };
    },
  },
};
