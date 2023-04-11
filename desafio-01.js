// Desafio entregable N°1 - BACKEND - CODERHOUSE

class ProductManager {
  constructor() {
    this.products = [];
  }
  addProduct(title, description, price, thumbnail, stock, id) {
    const existingProduct =
      this.products.find((p) => p.id === id) ||
      this.products.find((p) => p.title === title);
    if (existingProduct) {
      console.log('this product id is already in array');
    } else {
      const product = {
        title,
        description,
        price,
        thumbnail,
        stock,
        id: this.#newId() + 1,
      };
      this.products.push(product);
      console.log('product added successfully');
    }
  }
  #newId() {
    let initialId = 0;
    this.products.map((product) => {
      if (product.id > initialId) initialId = product.id;
    });
    return initialId;
  }
  getProducts() {
    return this.products;
  }
  getProductById(productId) {
    return this.products.find((product) => product.id === productId);
  }
}

const productManager = new ProductManager();
productManager.addProduct(
  'lipstick',
  'red lipstick with matte finish',
  19.99,
  'https://www.lancome-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-lancome-us-Library/default/dwf59fb71d/images/beauty%20mag/2022/11-November/LU13538_LIPSTICK_ON_LIP_1280x639.jpg?sw=1350&sh=674&sm=cut&q=70',
  18
);
//console.log(productManager);
productManager.addProduct(
  'eyeliner',
  'enhance your look with this lasting liquid eyeliner',
  15.99,
  'https://cdn.shopify.com/s/files/1/0483/3588/0360/products/Product-Images_Swatches_LiquidEyeliner_720x.jpg?v=1666128024',
  24
);
//console.log(productManager);
productManager.addProduct(
  'eyeliner',
  'enhance your look with this lasting liquid eyeliner',
  15.99,
  'https://cdn.shopify.com/s/files/1/0483/3588/0360/products/Product-Images_Swatches_LiquidEyeliner_720x.jpg?v=1666128024',
  24
);
//console.log(productManager);
//console.log(productManager.getProducts());
//console.log(productManager.getProductById(2));
