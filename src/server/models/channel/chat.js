import mongoose, { Schema } from 'mongoose';

const Chat = mongoose.model(
  'Chat',
  new Schema({
    name: String,
    msg: String,
    room: String,
    created: { type: Date, default: Date.now },
    file: {
      name: String,
      url: String,
      isImage: Boolean,
      fileType: String,
    },
  }),
);

export default Chat;
