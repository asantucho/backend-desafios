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
        return productsJs.find((product) => product.id === id);
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async updateProductById(id, updatedProduct) {
    try {
      const product = await this.getProductsById(id);
      if (product) {
        product.title = updatedProduct.title ?? product.title;
        product.description = updatedProduct.description ?? product.description;
        product.price = updatedProduct.price ?? product.price;
        product.thumbnail = updatedProduct.imageUrl ?? product.imageUrl;
        product.stock = updatedProduct.stock ?? product.stock;
        product.code = updatedProduct.code ?? product.code;

        const products = await fs.promises.readFile(this.path, 'utf-8');
        const productsJs = JSON.parse(products);
        const updatedProducts = productsJs.map((prod) => {
          if (prod.id === id) {
            return product;
          }
          return prod;
        });
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(updatedProducts, null, 2)
        );
        return product;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProductById(id) {
    try {
      const products = await fs.promises.readFile(this.path, 'utf-8');
      const productsJs = JSON.parse(products);
      const deletedProduct = productsJs.find((product) => product.id === id);
      const remainingProducts = productsJs.filter(
        (product) => product.id !== id
      );
      await fs.promises.writeFile(this.path, JSON.stringify(remainingProducts));
      return deletedProduct;
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
  const productById = await productManager.getProductsById(25);
  if (productById) {
    console.log('producto encontrado:');
    console.log(productById);
  } else {
    console.log('error, producto no encontrado');
  }
  const updateMethod = await productManager.updateProductById(12, {
    title: 'testing the update method',
  });
  console.log('producto actualizado:');
  console.log(updateMethod);
  const deleteMethod = await productManager.deleteProductById(4);
  console.log('producto eliminado: ');
  console.log(deleteMethod);
};

test1();
