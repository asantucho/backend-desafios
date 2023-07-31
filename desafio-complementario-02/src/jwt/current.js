import { ExtractJwt } from 'passport-jwt';

const cookieExtractor = (req) => {
  const token = req.cookie.token;
  return token;
};

const cookieStrategyOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: '0303456',
};

passport.use('cookieExtractor', cookieStrategyOptions);
