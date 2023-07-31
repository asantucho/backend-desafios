import { usersModel } from './daos/models/users-model.js';
import mongoose from 'mongoose';
import 'dotenv/config';

const connectionString = process.env.MONGO_URL;

const testUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  password: '0303456',
};

const connectToDatabase = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to the MongoDB database');
  } catch (error) {
    console.error('Error connecting to the MongoDB database:', error);
  }
};

const createUser = async (userData) => {
  try {
    const createdUser = await usersModel.create(userData);
    console.log('New user created:', createdUser);
  } catch (error) {
    console.error('Error creating new user:', error);
  }
};

connectToDatabase();
createUser(testUser);
