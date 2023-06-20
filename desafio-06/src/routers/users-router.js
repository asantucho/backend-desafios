import { Router } from 'express';
import {
  getUserByEmailController,
  createUserController,
  logInController,
} from '../controllers/users-controllers.js';

const usersRouter = Router();

usersRouter.post('/register', createUserController);
usersRouter.post('/login', logInController);
usersRouter.get('/:email', getUserByEmailController);
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
