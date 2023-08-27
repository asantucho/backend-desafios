import Controller from './main-controller.js';
import MockProductService from '../services/product-services.js';
import { createResponse } from '../utils.js';

const mockProductService = new MockProductService();

export default class MockProductController extends Controller {
  constructor() {
    super(mockProductService);
  }
  createMockProduct = async (req, res, next) => {
    const { cant } = req.query;
    try {
      const products = await this.service.createMockProduct(cant);
      createResponse(res, 200, products);
    } catch (error) {
      next(error.message);
    }
  };
  getAllMockProducts = async (req, res, next) => {
    try {
      const response = await this.service.getAll();
      createResponse(res, 200, response);
    } catch (error) {
      next(error.message);
    }
  };
}
