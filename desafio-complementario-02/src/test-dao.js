import 'dotenv/config';
import mongoose from 'mongoose';
import UserManager from './daos/managers/users-manager.js';

const connectionString = process.env.MONGO_URL;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to the MongoDB database');
    testDaoOperations();
  } catch (error) {
    console.error('Error connecting to the MongoDB database:', error);
  }
};

const testDaoOperations = async () => {
  const userManager = new UserManager();

  try {
    // const newUser = {
    //   firstName: 'John',
    //   lastName: 'Doe',
    //   email: 'john.doe@example.com',
    //   password: '0303456',
    // };
    // const createdUser = await userManager.create(newUser);
    // console.log('New user created:', createdUser);

    // const userId = '64c42cc43210f5a699c515d5';
    // const userById = await userManager.getById(userId);
    // console.log('User by ID:', userById);

    // //getByEmail method
    // const userEmail = 'john.doe@example.com';
    // const userByEmail = await userManager.getByEmail(userEmail);
    // console.log('User by email:', userByEmail);

    // update method
    // const updatedUser = await userManager.update(userId, { lastName: 'Smith' });
    // console.log('Updated user:', updatedUser);

    // // delete method
    // const deletedUser = await userManager.delete(userId);
    // console.log('Deleted user:', deletedUser);

    // Test register method
    const user = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      password: '123456',
    };
    const token = await userManager.register(user);
    console.log('New user registered. Token:', token);

    // // Test login method (from the UserService)
    // const loginData = {
    //   email: 'jane.doe@example.com',
    //   password: '123456',
    // };
    // const loggedInUser = await userManager.login(loginData);
    // console.log('Logged-in user:', loggedInUser);

    // // Test profile method (from the UserService)
    // const profileData = {
    //   firstName: 'Jane',
    //   lastName: 'Doe',
    //   email: 'jane.doe@example.com',
    //   role: 'user',
    // };
    // const userProfile = await userManager.profile(profileData);
    // console.log('User profile:', userProfile);
  } catch (error) {
    console.error('Error performing DAO operations:', error);
    //   } finally {
    //     // Close the database connection when done
    //     mongoose.disconnect();
  }
};

// Call the function to connect to MongoDB and start testing DAO operations
connectToDatabase();
