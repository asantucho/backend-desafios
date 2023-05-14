import { Router } from 'express';
import { __dirname } from '../path.js';

const viewsRouter = Router();

viewsRouter.get('/', (req, res) => {
  res.render(__dirname + '/views/layouts/main');
});

viewsRouter.get('/realTimeProducts', (req, res) => {
  res.render(__dirname + '/views/partials/products');
});
export default viewsRouter;
