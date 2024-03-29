import mongoose from 'mongoose';

export const productsCollection = 'products';

const productsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  thumbnail: { type: String, required: false },
  code: { type: Number, required: true },
  status: { type: Boolean, default: true },
  category: { type: String, required: true },
});

export const productsModel = mongoose.model(productsCollection, productsSchema);
