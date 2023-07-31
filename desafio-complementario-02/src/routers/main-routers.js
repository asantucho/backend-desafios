import { Router } from 'express';
import productRouter from './product-router.js';
import userRouter from './users-router.js';
import currentRouter from './sessions-router.js';

const mainRouter = Router();

mainRouter.use('/products', productRouter);
mainRouter.use('/users', userRouter);
mainRouter.use('/sessions/current', currentRouter);

export default mainRouter;
