import { usersModel } from './models/users-model.js';

export default class UsersDaoMongo {
  async createUser(user) {
    try {
      const { email } = user;
      const registeredUser = await usersModel.find({ email });
      if (registeredUser.length === 0) {
        if (email === 'adminCoder@coder.com' && password === 'adminCoder123') {
          const newUser = await usersModel.create({ ...user, role: 'admin' });
          return newUser;
        } else {
          const newUser = await usersModel.create({ ...user, role: 'user' });
          return newUser;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getUserByEmail(user) {
    try {
      const { email } = user;
      const registeredUser = await usersModel.findOne({ email });
      return registeredUser;
    } catch (error) {
      console.log(error);
    }
  }
  async logIn(user) {
    try {
      const { email, password } = user;
      const registeredUser = await usersModel.find({ email, password });
      if (registeredUser.length !== 0) {
        return registeredUser;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
