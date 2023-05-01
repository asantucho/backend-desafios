import express from 'express';
import { ProductManager } from './ProductManager/ProductManager.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager('./products.json');

app.get('/products', async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : null;
  try {
    const products = await productManager.getProducts();
    const limitedProducts = limit ? products.slice(0, limit) : products;
    res.status(200).json(limitedProducts);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productManager.getProductsById(Number(id));
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(400).send('product not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
});

app.post('/products', async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await productManager.createProduct(product);
    res.json(newProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const products = await productManager.getProducts();
    if (products.length > 0) {
      await productManager.deleteProductById(Number(id));
      res.send(`product id: ${id} was successfully deleted`);
    } else {
      res.send(`product with id ${id} not found`);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`server working on port ${PORT}`);
});
