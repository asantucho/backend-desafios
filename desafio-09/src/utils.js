import bcrypt from 'bcrypt';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { faker } from '@faker-js/faker';

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const createResponse = (res, statusCode, data) => {
  return res.status(statusCode).json({ data });
};

export const generateUniqueCode = () => {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substr(2, 5);
  return `${timestamp}-${randomPart}`;
};

export const calculateTotalAmount = (products) => {
  console.log('products del calculateTotal: ', products);
  return products.reduce(
    (total, product) => total + product.quantity * product.product.price,
    0
  );
};

export const generateProduct = () => {
  return {
    title: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price({ min: 50, max: 1000 }),
    category: faker.commerce.department(),
  };
};
