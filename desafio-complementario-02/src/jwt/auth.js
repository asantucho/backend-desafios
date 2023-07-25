import jwt from 'jsonwebtoken';
import UserManager from '../daos/managers/users-manager.js';
import 'dotenv/config';

const userManager = new UserManager();

const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;

export const checkAuth = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) return res.status(401).json({ msg: 'Unauthorized' });
    const token = authHeader.split(' ')[1];
    const decode = jwt.verify(token, SECRET_KEY_JWT);
    const user = await userManager.getById(decode.userId);
    if (!user) return res.status(401).json({ msg: 'Unauthorized' });
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};
