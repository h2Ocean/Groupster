import mongoose, { Schema } from 'mongoose';

const Chat = mongoose.model(
  'Chat',
  new Schema({
    user: Schema.types.ObjectID,
    nick: String,
    msg: String,
    created: { type: Date, default: Date.now },
  }),
);

export default Chat;
