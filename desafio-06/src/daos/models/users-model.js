import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const usersCollection = 'users';

const usersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: false },
  isGithub: { type: Boolean, required: true, default: false },
});

usersSchema.plugin(mongoosePaginate);

export const usersModel = mongoose.model(usersCollection, usersSchema);
