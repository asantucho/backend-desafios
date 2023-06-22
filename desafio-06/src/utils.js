import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

export const __dirname = dirname(fileURLToPath(import.meta.url));

// password + bcrypt

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const correctPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);
