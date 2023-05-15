import { Router } from 'express';
import { __dirname } from '../path.js';

const viewsRouter = Router();

viewsRouter.get('/', (req, res) => {
  res.render('home');
});

viewsRouter.get('/realtimeproducts', (req, res) => {
  res.render('realtimeproducts');
});
export default viewsRouter;
