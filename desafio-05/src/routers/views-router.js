import { Router } from 'express';

const viewsRouter = Router();

viewsRouter.get('/chat', (req, res) => {
  res.render('chat');
});

viewsRouter.get('/realtimeproducts', (req, res) => {
  res.render('realtimeproducts');
});

viewsRouter.get('/', (req, res) => {
  res.render('home');
});

viewsRouter.get('/register', (req, res) => {
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

viewsRouter.get('/welcome', (req, res) => {
  res.render('welcome');
});

export default viewsRouter;
