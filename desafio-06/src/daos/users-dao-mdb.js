import { usersModel } from './models/users-model.js';
import { createHash, correctPassword } from '../utils.js';

export default class UsersDaoMongo {
  async createUser(user) {
    try {
      const { email, password } = user;
      const registeredUser = await usersModel.findOne({ email });
      if (!registeredUser) {
        if (email === 'adminCoder@coder.com' && password === 'adminCoder123') {
          const newUser = await usersModel.create({
            ...user,
            password: createHash(password),
            role: 'admin',
          });
          return newUser;
        } else {
          const newUser = await usersModel.create({
            ...user,
            password: createHash(password),
            role: 'user',
          });
          return newUser;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
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
  async getUserById(id) {
    try {
      const registeredUser = await usersModel.findOne({ _id: id });
      return registeredUser;
    } catch (error) {
      console.log(error);
    }
  }
  async logIn(user) {
    try {
      const { email, password } = user;
      const registeredUser = await usersModel.findOne({ email });
      if (registeredUser) {
        const validPassword = correctPassword(registeredUser, password);
        if (!validPassword) return false;
        else return registeredUser;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
