import { Router } from 'express';
import passport from 'passport';
import '../jwt/jwt.js';

const currentRouter = Router();

currentRouter.get(
  '/current',
  passport.authenticate('jwtCookies', { session: false }),

  (req, res, next) => {
    console.log('info', req.user);
    next();
  },
  (err, req, res, next) => {
    console.error('Authentication error:', err);
    res.status(401).json({ error: 'Unauthorized' });
  },
  (req, res) => {
    if (req.user) {
      res.json({ user: req.user });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  }
);

export default currentRouter;
