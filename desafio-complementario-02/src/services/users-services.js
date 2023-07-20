import Services from './main-services.js';
import UserManager from '../daos/managers/users-manager.js';

const userManager = new UserManager();

export default class UserService extends Services() {
  constructor() {
    super(userManager);
  }
  async register(user) {
    try {
      const token = await this.userManager.register(user);
      return token;
    } catch (error) {
      console.log('error en el service', error);
    }
  }
  async getByEmail(email) {
    try {
      const existingUser = await this.userManager.getByEmail(email);
      return existingUser;
    } catch (error) {
      console.log('error en el service', error);
    }
  }
  async login(user) {
    try {
      const existingUser = await this.userManager.login(user);
      return existingUser;
    } catch (error) {
      console.log('error en el service', error);
    }
  }
}
