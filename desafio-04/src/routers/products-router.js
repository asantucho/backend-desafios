import { Router } from 'express';
import {
  createProduct,
  deleteProductById,
  getProducts,
  getProductsById,
  updatedProductById,
} from '../managers/productManager.js';
import { getIo } from '../socket.js';

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : null;
  try {
    const products = await getProducts(limit);
    const limitedProducts = limit ? products.slice(0, limit) : products;
    res.status(200).json(limitedProducts);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
});

productsRouter.get('/:prodId', async (req, res) => {
  try {
    const { prodId } = req.params;
    const product = await getProductsById(Number(prodId));
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).send('product not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
});

productsRouter.post('/', async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await createProduct(product);
    const io = getIo();
    io.emit('products', await getProducts());
    res.json(newProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
});

productsRouter.put('/:prodId', async (req, res) => {
  try {
    const product = req.body;
    const { prodId } = req.params;
    const selectedProduct = await getProductsById(Number(prodId));
    if (selectedProduct) {
      await updatedProductById(product, Number(prodId));
      res.status(200).send('product updated successfully');
    } else {
      res.status(404).send('product not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
});

productsRouter.delete('/:prodId', async (req, res) => {
  try {
    const { prodId } = req.params;
    const products = await getProducts();
    if (products.length > 0) {
      await deleteProductById(Number(prodId));
      res.status(200).send(`product with id ${prodId} deleted successfully`);
    } else {
      res.send(`product id ${prodId} not found`);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
});

export default productsRouter;
