import {
  getUserByEmailService,
  createUserService,
  logInService,
} from '../services/users-services.js';
import 'mongoose-paginate-v2';

export const createUserController = async (req, res, next) => {
  try {
    const newUser = await createUserService(req.body);
    if (newUser) {
      res.redirect('/login');
    } else {
      res.redirect('/register-error');
    }
  } catch (error) {
    next(error);
  }
};

export const getUserByEmailController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await getUserByEmailService(email);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const logInController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await logInService(req.body);
    if (user) {
      (req.session.email = email),
        (req.session.password = password),
        res.redirect('/welcome');
    } else {
      res.redirect('/login-error');
    }
  } catch (error) {
    next(error);
  }
};
