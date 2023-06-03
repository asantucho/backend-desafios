import express from 'express';
import handlebars from 'express-handlebars';
import { __dirname } from './path.js';
import productsRouter from './routers/products-router.js';
import cartRouter from './routers/carts-router.js';
import messagesRouter from './routers/messages-router.js';
import viewsRouter from './routers/views-router.js';
import { init as initSocket } from './socket.js';
import './db/database.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use('/', viewsRouter);
app.use('/products', productsRouter);
app.use('/carts', cartRouter);
app.use('/messages', messagesRouter);

const httpServer = app.listen(8080, () => {
  console.log('server working at 8080 port');
});

const socketServer = initSocket(httpServer);

socketServer.on('connection', (socket) => {
  console.log('user connected successfully');
  socket.on('disconnect', () => {
    console.log('user logged out');
  });
});
