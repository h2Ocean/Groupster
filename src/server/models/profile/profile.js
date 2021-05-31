import mongoose, { Schema } from 'mongoose';

const profileSchema = new Schema({
  username: { type: String, unique: true, required: true },
  name: String,
  email: { type: String, unique: true, required: true },
  age: Number,
  bio: { type: String, default: '' },
  pfp: { type: String, default: '' },
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
