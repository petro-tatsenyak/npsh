import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String, required: true, unique: true, index: true, dropDups: true,
  },
  password: { type: String, required: true },
  isSeller: { type: Boolean, required: true, default: false },
  isAdmin: { type: Boolean, required: true, default: false },
  country: { type: String },
  region: { type: String },
  city: { type: String },
  street: { type: String },
  building: { type: Number },
  flat: { type: Number },
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
