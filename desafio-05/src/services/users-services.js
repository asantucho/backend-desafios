import UsersDaoMongo from '../daos/mongoDB/users-dao-mdb.js';

const usersDao = new UsersDaoMongo();

export const createUserService = async (object) => {
  try {
    const newUser = await usersDao.createUser(object);
    return newUser;
  } catch (error) {
    console.log(error);
  }
};

export const getUserByEmailService = async (email) => {
  try {
    const user = await usersDao.getUserByEmail(email);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const logInService = async (object) => {
  try {
    const user = await usersDao.logIn(object);
    return user;
  } catch (error) {
    console.log(error);
  }
};
