import { usersModel } from '../models/users-model.js';
import MainClass from '../main-class.js';
import { createHash, isValidPassword } from '../../utils.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SECRET_KEY = process.env.SECRET_KEY;

export default class UserManager extends MainClass {
  constructor() {
    super(usersModel);
  }
  #generateToken(user) {
    const payload = {
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: '10m',
    });
    return token;
  }
  async getByEmail(email) {
    try {
      const existingUser = await this.model.findOne({ email });
      if (existingUser) {
        return existingUser;
      } else return false;
    } catch (error) {
      console.log('error en el user-manager', error);
    }
  }
  async register(user) {
    try {
      const { email, password } = user;
      const registeredUser = await this.getByEmail({ email });
      if (!registeredUser) {
        const newUser = await this.create({
          ...user,
          password: createHash(password),
        });
        const token = this.#generateToken(newUser);
        return token;
      }
    } catch (error) {
      console.log('error en el user-manager:', error);
    }
  }
}
