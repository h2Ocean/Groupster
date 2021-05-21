import mongoose, { Schema } from 'mongoose';

const Channel = mongoose.model(
  'Channel',
  new Schema({
    name: String,
    desc: String,
    category: Schema.types.ObjectId,
    subCategory: Schema.types.ObjectId,
    roles: [Schema.types.ObjectId],
    admin: [Schema.types.ObjectId],
    owner: Schema.types.ObjectId,
    org: Schema.types.ObjectId,
    users: [
      {
        profile: Schema.types.ObjectId,
        role: Schema.types.ObjectId,
      },
    ],
  }),
);

export default Channel;
