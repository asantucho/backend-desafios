import express from 'express';
import { __dirname } from './utils.js';
import './database/database.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { errorHandler } from './middlewares/errorHandler.js';
import mainRouter from './routers/main-routers.js';

const storeOptions = {
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    crypto: {
      secret: process.env.SECRET_KEY,
    },
    ttl: 60000,
  }),
};

const sessionConfig = {
  secret: process.env.SECRET_KEY,
  saveUninitialized: false,
  resave: false,
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorHandler);
app.use(session({ ...sessionConfig, ...storeOptions }));
app.use('/api', mainRouter);

const httpServer = app.listen(8080, () => {
  console.log('server working at 8080 port');
});
