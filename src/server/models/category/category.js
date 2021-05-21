import mongoose, { Schema } from 'mongoose';

const Category = mongoose.model(
  'Category',
  new Schema({
    name: String,
    subCategory: [Schema.types.ObjectId],
  })
);

export default Category;
