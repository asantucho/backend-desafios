import Controller from './main-controller.js';
import UserService from '../services/users-services.js';
import { createResponse } from '../utils.js';

const userService = new UserService();

export default class UserController extends Controller {
  constructor() {
    super(userService);
  }
  async register(req, res, next) {
    try {
      const token = await this.userService.register(req.body);
      createResponse(res, 200, token);
    } catch (error) {
      next(error.message);
    }
  }
  async login(req, res, next) {
    try {
      const userExists = await this.userService.login(req.body);
      userExists
        ? createResponse(res, 200, userExists)
        : createResponse(res, 404, {
            method: 'login',
            error: 'Validation error',
          });
    } catch (error) {
      next(error.message);
    }
  }
  async profile(req, res, next) {
    try {
      const { firstName, lastName, email, role } = req.user;
      createResponse(res, 200, {
        firstName,
        lastName,
        email,
        role,
      });
    } catch (error) {
      next(error.message);
    }
  }
  async getByEmail(req, res, next) {
    try {
      const existingUser = await this.userService.getByEmail(req.user);
      createResponse(res, 200, existingUser);
    } catch (error) {
      next(error);
    }
  }
}
