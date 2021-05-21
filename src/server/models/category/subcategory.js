import mongoose, { Schema } from 'mongoose';

const SubCategory = mongoose.model(
  'SubCategory',
  new Schema({
    name: String,
    channels: [Schema.types.ObjectId],
  })
);

export default SubCategory;
