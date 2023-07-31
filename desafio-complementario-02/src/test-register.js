import UserManager from './daos/managers/users-manager.js';

const testDaoOperations = async () => {
  const userManager = new UserManager();

  try {
    const user = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      password: '123456',
    };
    const token = await userManager.register(user);
    console.log('New user registered. Token:', token);
  } catch (error) {
    console.error('Error performing DAO operations:', error);
  }
};

testDaoOperations();
