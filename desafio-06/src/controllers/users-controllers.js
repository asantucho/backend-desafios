import passport from 'passport';
import {
  getUserByEmailService,
  createUserService,
  logInService,
  getUserByIdService,
} from '../services/users-services.js';
import 'mongoose-paginate-v2';

const { session } = passport;

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

export const getUserByIdController = async (req, res, next) => {
  try {
    const { id } = req.body;
    const user = await getUserByIdService(id);
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
      req.session.email = email;
      req.session.password = password;
      res.redirect('/welcome');
    } else {
      res.redirect('/login-error');
    }
  } catch (error) {
    next(error);
  }
};

export const githubResponse = async (req, res, next) => {
  try {
    const { firstName, lastName, email, role, isGithub } = req.user;
    res.json({
      msg: 'Register/Login with Github successful',
      session: req.session,
      userData: {
        firstName,
        lastName,
        email,
        role,
        isGithub,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const localRegisterResponse = async (req, res, next) => {
  try {
    res.json({
      msg: 'local register OK',
      session: req.session,
    });
  } catch (error) {
    next(error);
  }
};

export const logInLocalResponse = async (req, res, next) => {
  try {
    const user = await getUserByIdService(req.session.passport.user);
    const { firstName, lastName, email, role, isGithub } = user;
    res.json({
      msg: 'local login OK',
      session: req.session,
      userData: {
        firstName,
        lastName,
        email,
        role,
        isGithub,
      },
    });
  } catch (error) {
    next(error);
  }
};
