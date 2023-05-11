import express from 'express';
import { __dirname } from './path.js';
// import productsRouter from './router/products-router.js';
// import cartsRouter from './router/cart-router.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
// app.use('/api/products', productsRouter);
// app.use('/api/carts', cartsRouter);
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.listen(8080, () => {
  console.log('server working at 8080 port');
});
