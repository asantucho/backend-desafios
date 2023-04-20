// desafio entregable 2

const fs = require('fs');

class ProductManager {
  constructor() {
    this.path = 'products.json';
  }
  async createProduct(title, description, price, thumbnail, stock, code, id) {
    try {
      const newId = await this.#newId();
      const product = {
        title,
        description,
        price,
        thumbnail,
        stock,
        code,
        id: newId + 1,
      };
      const productsFile = await this.getProducts();
      productsFile.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
    } catch (error) {
      console.log(error);
    }
  }
  async #newId() {
    const products = await this.getProducts();
    let initialId = 0;
    products.map((product) => {
      if (product.id > initialId) initialId = product.id;
    });
    return initialId;
  }
  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, 'utf-8');
        const productsJs = JSON.parse(products);
        return productsJs;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getProductsById(id) {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, 'utf-8');
        const productsJs = JSON.parse(products);
        return productsJs.find((product) => product.id === parseInt(id));
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const productManager = new ProductManager();

const test1 = async () => {
  const get = await productManager.getProducts();
  console.log('primera consulta', get);
  productManager.createProduct(
    'lipstick',
    'red lipstick with matte finish',
    19.99,
    'https://www.lancome-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-lancome-us-Library/default/dwf59fb71d/images/beauty%20mag/2022/11-November/LU13538_LIPSTICK_ON_LIP_1280x639.jpg?sw=1350&sh=674&sm=cut&q=70',
    18,
    12345
  );
  const updatedGet = await productManager.getProducts();
  console.log('segunda consulta', updatedGet);
  const productById = await productManager.getProductsById(10);
  if (productById) {
    console.log(`producto encontrado: ${productById}`);
  } else {
    console.log('error, producto no encontrado');
  }
};

test1();
