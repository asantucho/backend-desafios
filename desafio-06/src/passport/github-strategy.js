import { Strategy as GithubStrategy } from 'passport-github2';
import passport from 'passport';
import UsersDaoMongo from '../daos/users-dao-mdb.js';

const userDao = new UsersDaoMongo();

const strategyOptionsGithub = {
  clientID: 'Iv1.61f8530e72667864',
  clientSecret: '6e7aa0625937c0a8cf7c8afd8bdcc45ef77a36ce',
  callbackURL: 'http://localhost:8080/users/github',
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  console.log('profile:::', profile);
  const email =
    profile._json.email !== null ? profile._json.profile : profile._json.blog;
  const user = await userDao.getUserByEmail(email);
  if (user) return done(null, user);
  const nameParts = profile._json.name.split(' ');

  let firstName = nameParts[0];
  let lastName = '';

  if (nameParts.length > 1) {
    lastName = nameParts.length > 2 ? nameParts[2] : nameParts[1];
  }
  const newUser = await userDao.createUser({
    firstName,
    lastName,
    email,
    password: '',
    isGithub: true,
  });
  return done(null, newUser);
};

passport.use(
  'github',
  new GithubStrategy(strategyOptionsGithub, registerOrLogin)
);
