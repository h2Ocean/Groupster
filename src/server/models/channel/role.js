import mongoose, { Schema } from 'mongoose';

const Role = mongoose.model(
  'Role',
  new Schema({
    channel: Schema.types.ObjectID,
    name: String,
    permissions: [Boolean],
  })
);

export default Role;
