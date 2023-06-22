import { Router } from 'express';
import {
  getUserByEmailController,
  createUserController,
  logInController,
  githubResponse,
  getUserByIdController,
  logInLocalResponse,
  localRegisterResponse,
} from '../controllers/users-controllers.js';
import '../passport/github-strategy.js';
import passport from 'passport';

const usersRouter = Router();

usersRouter.post(
  '/register',
  passport.authenticate('register'),
  localRegisterResponse
);
usersRouter.post('/login', passport.authenticate('login', logInLocalResponse));
usersRouter.get('/:email', getUserByEmailController);
usersRouter.get('/:id', getUserByIdController);
usersRouter.get(
  '/register-github',
  passport.authenticate('github', { scope: ['user:email'] })
);
usersRouter.get(
  '/profile-github',
  passport.authenticate('github', { scope: ['user:email'] }),
  (req, res) => {
    res.send('OK');
  }
);
usersRouter.post('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      }
      res.redirect('/login');
    });
  } else {
    res.redirect('/login');
  }
});

export default usersRouter;
