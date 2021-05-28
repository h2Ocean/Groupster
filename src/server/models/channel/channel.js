import mongoose, { Schema } from 'mongoose';

const Channel = mongoose.model(
  'Channel',
  new Schema({
    strId: { type: String, unique: true },
    name: String,
    category: String,
    admin: [{ type: Schema.types.ObjectId }],
    users: [{ type: Schema.types.ObjectId }],
  }),
);

export default Channel;
// name: String,
// desc: String,
// category: Schema.types.ObjectId,
// subCategory: Schema.types.ObjectId,
// roles: [Schema.types.ObjectId],
// admin: [Schema.types.ObjectId],
// owner: Schema.types.ObjectId,
// org: Schema.types.ObjectId,
// users: [
//   {
//     nick: String,
//     profile: Schema.types.ObjectId,
//     role: Schema.types.ObjectId,
//   },
// ],
