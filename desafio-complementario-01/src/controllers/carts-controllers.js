import {
  createCartService,
  getAllCartsService,
  getCartByIdService,
  deleteCartByIdService,
  addToCartService,
} from '../services/carts-services.js';

export const createCartController = async (req, res, next) => {
  try {
    const { products } = req.body;
    const newCart = await createCartService({ products });
    res.json(newCart);
  } catch (error) {
    next(error);
  }
};

export const getAllCartsController = async (req, res, next) => {
  try {
    const carts = await getAllCartsService();
    res.json(carts);
  } catch (error) {
    next(error);
  }
};

export const getCartByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await getCartByIdService(id);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const deleteCartByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCart = await deleteCartByIdService(id);
    res.json(`${deletedCart} deleted successfully`);
  } catch (error) {
    next(error);
  }
};

export const addToCartController = async (req, res, next) => {
  try {
    const { prodId, cartId } = req.params;
    const addedProduct = await addToCartService(prodId, cartId);
    res.json(addedProduct);
  } catch (error) {
    next(error);
  }
};
