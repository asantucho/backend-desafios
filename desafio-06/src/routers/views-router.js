import { Router } from 'express';
import { isLogged } from '../middlewares/logged-views.js';

const viewsRouter = Router();

viewsRouter.get('/users/login', (req, res) => {
  res.render('login');
});

viewsRouter.get('/users/register', (req, res) => {
  res.render('register-form');
});

viewsRouter.get('/login', (req, res) => {
  res.render('login');
});

viewsRouter.get('/register-error', (req, res) => {
  res.render('register-error');
});

viewsRouter.get('/login-error', (req, res) => {
  res.render('error-login');
});

viewsRouter.get('/welcome', isLogged, (req, res) => {
  const firstName = req.session.firstName;

  res.render('welcome', { firstName });
});

export default viewsRouter;
