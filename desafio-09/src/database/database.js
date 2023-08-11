import mongoose from 'mongoose';
import config from '../config.js';

const connectionString = config.MONGO_URL;

try {
  await mongoose.connect(connectionString, { serverSelectionTimeoutMS: 30000 });
  console.log('Conectado a la base de datos de MongoDB');
} catch (error) {
  console.log(error);
}
