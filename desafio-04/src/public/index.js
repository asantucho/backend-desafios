const socketClient = io();

const form = document.querySelector('#form');
const inputProductName = document.querySelector('#productName');
const inputProductDescription = document.querySelector('#productDescription');
const inputProductStock = document.querySelector('#productStock');
const inputProductCode = document.querySelector('#productCode');
const inputProductPrice = document.querySelector('#productPrice');
const button = document.querySelector('#button');

const productsContainer = document.querySelector('#productsContainer');
const productsList = document.querySelector('#productsList');

form.onSubmit = (event) => {
  event.preventDefault();
  const product = {
    name: inputProductName.value,
    description: inputProductDescription.value,
    code: inputProductCode.value,
    stock: inputProductStock.value,
    price: inputProductPrice.value,
  };
  socketClient.emit('newProduct', product);
  inputProductName.value = '';
  inputProductDescription.value = '';
  inputProductCode.value = '';
  inputProductStock.value = '';
  inputProductPrice.value = '';
};

socketClient.on('products', (data) => {
  const productsRender = data.map((prod) => {
    return `<li>${prod.id} || ${prod.name} || ${prod.description} || ${prod.price}</li>`;
  });
  productsList.innerHTML = productsRender;
});
