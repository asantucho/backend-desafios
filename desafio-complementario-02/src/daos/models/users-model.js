import mongoose from 'mongoose';

const usersCollection = 'users';

const usersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: false },
  isGoogle: { type: Boolean, required: false, default: false },
});

export const usersModel = mongoose.model(usersCollection, usersSchema);
