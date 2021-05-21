import mongoose, { Schema } from 'mongoose';

const Organization = mongoose.model(
  'Organization',
  new Schema({
    name: String,
    desc: String,
    admin: [Schema.types.ObjectId],
    owner: Schema.types.ObjectId,
  }),
);

export default Organization;
