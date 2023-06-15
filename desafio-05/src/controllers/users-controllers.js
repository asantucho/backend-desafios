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
      res.json(newUser);
      res.redirect('/views');
    } else {
      res.redirect('/views/register-error');
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
        res.json(user);
      res.redirect('/views/profile');
    } else {
      res.redirect('/views/error-login');
    }
  } catch (error) {
    next(error);
  }
};
