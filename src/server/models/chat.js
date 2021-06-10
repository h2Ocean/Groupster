const mongoose = require('mongoose');

const { Schema } = mongoose;
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

module.exports = Chat;
