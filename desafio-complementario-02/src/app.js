import express from 'express';
import { __dirname } from './utils.js';
import './database/database.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import mainRouter from './routers/main-routers.js';

const storeOptions = {
  store: MongoStore.create({
    mongoUrl:
      'mongodb+srv://masantucho:masantucho@cluster0.noyiw8q.mongodb.net/desafio-06',
    crypto: {
      secret: '0303456',
    },
    ttl: 60000,
  }),
};

const sessionConfig = {
  secret: '0303456',
  saveUninitialized: false,
  resave: false,
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(session({ ...sessionConfig, ...storeOptions }));
app.use('/api', mainRouter);

const httpServer = app.listen(8080, () => {
  console.log('server working at 8080 port');
});
