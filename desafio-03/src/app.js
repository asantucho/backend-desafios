import express from 'express';
import ProductManager from './ProductManager/ProductManager';
import { urlencoded } from 'body-parser';

const app = express();

app.use(express.json());
app.use(express / urlencoded({ extended: true }));

const productManager = new ProductManager('./products.json');

app.get('/products', async);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`server working on port ${PORT}`);
});
