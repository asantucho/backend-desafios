import { Router } from 'express';
import passport from 'passport';
import { cookieStrategyOptions } from '../jwt/current.js';

passport.use('cookieExtractor', cookieStrategyOptions);

const currentRouter = Router();

currentRouter.get(
  '/current',
  passport.authenticate('cookieExtractor', { session: false }),
  (req, res) => {
    if (req.user) {
      res.json({ user: req.user });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  }
);

export default currentRouter;
