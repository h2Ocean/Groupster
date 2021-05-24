import mongoose, { Schema } from 'mongoose';

const Chat = mongoose.model(
  'Chat',
  new Schema({
    name: String,
    nick: String,
    msg: String,
    created: { type: Date, default: Date.now },
  }),
);

export default Chat;
