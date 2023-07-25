import passport from 'passport';
import { ExtractJwt, Strategy as jwtStrategy } from 'passport-jwt';
import UserManager from '../daos/managers/users-manager.js';

const userManager = new UserManager();

const strategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: '0303456',
};

const verifyToken = async (jwt_payload, done) => {
  const user = await userManager.getById(jwt_payload.userId);
  if (!user) return done(null, false);
  return done(null, jwt_payload);
};

passport.use('jwt', new jwtStrategy(strategyOptions, verifyToken));

passport.serializeUser((user, done) => {
  done(null, user.userId);
});

passport.deserializeUser(async (id, done) => {
  const user = await userManager.getById(id);
  return done(null, user);
});
