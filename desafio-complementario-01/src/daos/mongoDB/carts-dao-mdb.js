import { cartsModel } from './models/carts-model.js';
import ProductsDaoMongo from './products-dao-mdb.js';

const products = new ProductsDaoMongo();

export default class CartsDaoMongo {
  async createCart() {
    try {
      const cart = await cartsModel.create();
      console.log(`cart ${response} created successfully`);
      cart.save();
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
  async getCartById(id) {
    try {
      const response = await cartsModel.findById(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async getAllCarts() {
    try {
      const response = await cartsModel.find({});
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteCartById(id) {
    try {
      const response = await cartsModel.findByIdAndDelete(id);
      console.log(`cart with id ${id} deleted successfully`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async addToCart(cartId, prodId) {
    try {
      const selectedProduct = await products.getProductById(prodId);
      const selectedCart = await this.getCartById(cartId);
      if (selectedCart && selectedProduct) {
        const productToAdd = selectedCart.products.find(
          (product) => product.id === selectedProduct.id
        );
        if (!productToAdd) {
          selectedCart.products.push({
            id: selectedProduct.id,
            quantity: 1,
          });
        } else {
          productToAdd.quantity++;
        }
        console.log('product added to the cart successfully!');
        productToAdd.save();
      }

      return productToAdd;
    } catch (error) {
      console.log(error);
    }
  }
}
