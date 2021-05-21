import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const profileSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: String,
  pfp: String,
  email: { type: String, unique: true, required: true },
  orgs: [Schema.Types.ObjectId],
  age: Number,
  channels: [Schema.Types.ObjectId],
});

profileSchema.pre('save', () => {
  const hashedPassword = bcrypt.hashSync(this.password, 12);
  this.password = hashedPassword;
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
