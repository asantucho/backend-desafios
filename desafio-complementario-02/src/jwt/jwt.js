import 'dotenv/config';
import passport from 'passport';
import { ExtractJwt, Strategy as jwtStrategy } from 'passport-jwt';
import UserManager from '../daos/managers/users-manager.js';

const userManager = new UserManager();

const strategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

const cookieExtractor = (req) => {
  const token = req.cookies.token;
  console.log('Token extraído:', token);
  return token;
};

const cookieStrategyOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: process.env.SECRET_KEY,
};

const verifyToken = async (jwt_payload, done) => {
  try {
    const user = await userManager.getById(jwt_payload.userId);
    console.log('user en verifyToken: ', user);
    if (!user) return done(null, false);
    return done(null, jwt_payload);
  } catch (error) {
    console.log(error);
  }
};

export const checkAuth = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader)
      return res
        .status(401)
        .json({ msg: 'Unauthorized porque no hay authheader' });
    const token = authHeader.split(' ')[1];
    console.log('token en checkAuth: ', token);
    const decode = jwt.verify(token, SECRET_KEY_JWT);
    console.log('decode en checkAuth: ', decode);
    const user = await userManager.getById(decode.userId);
    console.log('user en checkAuth: ', user);
    if (!user)
      return res.status(401).json({ msg: 'Unauthorized porque no hay user' });
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

passport.use('jwt', new jwtStrategy(strategyOptions, verifyToken));
passport.use('jwtCookies', new jwtStrategy(cookieStrategyOptions, checkAuth));

passport.serializeUser((user, done) => {
  done(null, user.userId);
});

passport.deserializeUser(async (id, done) => {
  const user = await userManager.getById(id);
  return done(null, user);
});
