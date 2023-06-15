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

export default usersRouter;
