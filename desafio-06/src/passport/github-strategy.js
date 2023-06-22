import { Strategy as GithubStrategy } from 'passport-github2';
import passport from 'passport';
import UsersDaoMongo from '../daos/users-dao-mdb';

const userDao = new UsersDaoMongo();

const strategyOptionsGithub = {
  clientId: 'Iv1.61f8530e72667864',
  clientSecret: '6e7aa0625937c0a8cf7c8afd8bdcc45ef77a36ce',
  callbackUrl: 'http://localhost:8080/users/github',
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  console.log('profile:::', profile);
  const email =
    profile._json.email !== null ? profile._json.profile : profile._json.blog;
  const user = await userDao.getUserByEmail(email);
  if (user) return done(null, user);
  const newUser = await userDao.createUser({
    firstName: profile._json.name.split('')[0],
    lastName: profile._json.name.split('')[2],
    email,
    password: '',
    isGithub: true,
  });
};

passport.use(
  'github',
  new GithubStrategy(strategyOptionsGithub, registerOrLogin)
);
