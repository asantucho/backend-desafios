import 'dotenv/config';

export default {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT,
  SECRET_KEY: process.env.SECRET_KEY,
  ENV: process.env.ENV,
  EMAIL: process.env.EMAIL,
  PASSWORD: process.env.PASSWORD,
};
