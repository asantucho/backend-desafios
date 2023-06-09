import express from 'express';
import { __dirname } from './path.js';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import productsRouter from './routers/products-router.js';
import viewsRouter from './routers/views-router.js';
import { init as initSocket } from './socket.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use('/products', productsRouter);
app.use('/', viewsRouter);

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
