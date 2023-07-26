import Services from './main-services.js';
import UserManager from '../daos/managers/users-manager.js';

const userManager = new UserManager();

export default class UserService extends Services {
  constructor() {
    console.log('UserService constructor called');
    super(userManager);
  }
  async register(user) {
    try {
      const token = await this.manager.register(user);
      return token;
    } catch (error) {
      console.log('error en el service', error);
    }
  }
  async getByEmail(email) {
    try {
      const existingUser = await this.manager.getByEmail(email);
      return existingUser;
    } catch (error) {
      console.log('error en el service', error);
    }
  }
  async login(user) {
    try {
      const existingUser = await this.manager.login(user);
      return existingUser;
    } catch (error) {
      console.log('error en el service', error);
    }
  }
}
