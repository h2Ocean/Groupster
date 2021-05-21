import mongoose, { Schema } from 'mongoose';

const Profile = mongoose.model(
  'Profile',
  new Schema({
    username: { type: String, unique: true },
    password: String,
    name: String,
    pfp: String,
    email: { type: String, unique: true },
    orgs: [Schema.Types.ObjectId],
    age: Number,
    channels: [Schema.Types.ObjectId],
  })
);

export default Profile;
