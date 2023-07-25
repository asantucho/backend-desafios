import { Router } from 'express';
import productRouter from './product-router.js';
import userRouter from './users-router.js';

const mainRouter = Router();

mainRouter.use('/products', productRouter);
mainRouter.use('/users', userRouter);

export default mainRouter;
