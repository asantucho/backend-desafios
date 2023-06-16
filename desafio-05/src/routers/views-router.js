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
  res.render('register');
});

viewsRouter.get('/login', (req, res) => {
  res.render('login');
});

export default viewsRouter;
