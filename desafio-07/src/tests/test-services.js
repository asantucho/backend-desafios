import mongoose from 'mongoose';
import UserService from '../services/users-services.js';
//import MainServices from './services/main-services.js';
import UserManager from '../daos/managers/users-manager.js';
import { createHash } from '../utils.js';
import 'dotenv/config';

// Connect to the MongoDB database
const connectionString = process.env.MONGO_URL;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to the MongoDB database');
    // testMainServices();
    testUserServices();

    // Close the database connection when done
    // mongoose.disconnect();
  } catch (error) {
    console.error('Error connecting to the MongoDB database:', error);
  }
};

const userManager = new UserManager();

// const testMainServices = async () => {
//   const mainService = new MainServices(userManager);

// Test create method
//   const newUser = {
//     firstName: 'John',
//     lastName: 'Doe',
//     email: 'john.doe@example.com',
//     password: createHash('password123'),
//   };
//   const createdUser = await mainService.create(newUser);
//   console.log('Created user:', createdUser);

//   // Test getAll method
//   const allUsers = await mainService.getAll();
//   console.log('All users:', allUsers);

//   // Test getById method
// const userId = '64c43aedc1e97a1f11733c31';
//   const userById = await mainService.getById(userId);
//   console.log('User by ID:', userById);

//   // Test update method
//   const updatedUser = await mainService.update(userId, {
//     firstName: 'Updated Name',
//   });
//   console.log('Updated user:', updatedUser);

//   // Test delete method
//   const deletedUser = await mainService.delete(userId);
//   console.log('Deleted user:', deletedUser);
// };

// Test all the methods in the UserService class
const testUserServices = async () => {
  const userService = new UserService();

  // Test register method
  //   const newUser = {
  //     firstName: 'Prueba',
  //     lastName: 'del service',
  //     email: 'servicetest@example.com',
  //     password: 'password123',
  //   };
  //   const token = await userService.register(newUser);
  //   console.log('Token:', token);

  // Test getByEmail method
  //   const email = 'servicetest@example.com';
  //   const existingUser = await userService.getByEmail(email);
  //   console.log('Existing user:', existingUser);

  //   // Test login method
  //   const userLogin = {
  //     email: 'servicetest@example.com',
  //     password: 'password123',
  //   };
  //   const loggedInUser = await userService.login(userLogin);
  //   console.log('Logged-in user:', loggedInUser);

  const userId = '64c7f2ebf9b646c181526ba4';
  const userProfile = await userService.profile(userId);
  console.log('User Profile:', userProfile);
};

connectToDatabase();
