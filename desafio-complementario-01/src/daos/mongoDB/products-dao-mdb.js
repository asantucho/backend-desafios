import { productsModel } from './models/products-model.js';

export default class ProductsDaoMongo {
  async createProduct(object) {
    try {
      const response = await productsModel.create(object);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async getAllProducts() {
    try {
      const response = await productsModel.find({});
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async getProductById(id) {
    try {
      const response = await productsModel.findById(id);
      if (!response) throw new Error('product not found');
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async updateProduct(object, id) {
    try {
      await productsModel.updateOne(object, { _id: id });
      console.log(`product with id ${id} updated successfully`);
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProductById(id) {
    try {
      await productsModel.findByIdAndDelete(id);
      console.log(`product with id ${id} deleted successfully`);
    } catch (error) {
      console.log(error);
    }
  }
}
