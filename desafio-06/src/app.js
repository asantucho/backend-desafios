import express from 'express';
import handlebars from 'express-handlebars';
import { __dirname } from './path.js';
import productsRouter from './routers/products-router.js';
import cartRouter from './routers/carts-router.js';
import usersRouter from './routers/users-router.js';
import viewsRouter from './routers/views-router.js';
import './db/database.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';

const storeOptions = {
  store: MongoStore.create({
    mongoUrl:
      'mongodb+srv://masantucho:masantucho@cluster0.noyiw8q.mongodb.net/desafio-05',
    crypto: {
      secret: '0303456',
    },
  }),
};

const sessionConfig = {
  secret: '0303456',
  cookie: { maxAge: 30000 },
  saveUninitialized: false,
  resave: false,
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(cookieParser());
app.use(session({ ...sessionConfig, ...storeOptions }));
app.use('/', viewsRouter);
app.use('/products', productsRouter);
app.use('/carts', cartRouter);
app.use('/users', usersRouter);

const httpServer = app.listen(8080, () => {
  console.log('server working at 8080 port');
});
