import CartsDaoMongo from '../daos/mongoDB/carts-dao-mdb';

const carts = new CartsDaoMongo();

export const createCartService = async () => {
  try {
    const doc = await carts.createCart();
    return doc;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCartsService = async () => {
  try {
    const docs = await carts.getAllCarts();
    return docs;
  } catch (error) {
    console.log(error);
  }
};

export const getCartByIdService = async (id) => {
  try {
    const doc = await carts.getCartById(id);
    return doc;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCartByIdService = async (id) => {
  try {
    const deletedCart = await carts.deleteCartById(id);
    return deletedCart;
  } catch (error) {
    console.log(error);
  }
};

export const addToCartService = async (prodId, cartId) => {
  try {
    const addedProduct = await carts.addToCart(prodId, cartId);
    return addedProduct;
  } catch (error) {
    console.log(error);
  }
};
