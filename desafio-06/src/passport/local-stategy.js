import { Strategy as localStrategy } from 'passport-local';
import UsersDaoMongo from '../daos/users-dao-mdb.js';
import passport from 'passport';

const userDao = new UsersDaoMongo();

const strategyOptionsLocal = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
};

const signUpLocal = async (req, email, password, done) => {
  try {
    const user = await userDao.getUserByEmail(email);
    if (user) return done(null, false);
    const newUser = await userDao.createUser(req.body);
    return done(null, newUser);
  } catch (error) {
    console.log(error);
  }
};

const logInLocal = async (req, email, password, done) => {
  try {
    const user = { email, password };
    console.log('user:', user);
    const userLogin = await userDao.logIn(user);
    console.log('userLogin:', userLogin);
    if (!userLogin) return done(null, false);
    return done(null, userLogin);
  } catch (error) {
    console.log(error);
  }
};

const signUpLocalStrategy = new localStrategy(
  strategyOptionsLocal,
  signUpLocal
);
const logInLocalStrategy = new localStrategy(strategyOptionsLocal, logInLocal);

passport.use('register', signUpLocalStrategy);
passport.use('login', logInLocalStrategy);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await userDao.getUserById(id);
  return done(null, user);
});
