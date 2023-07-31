import { ExtractJwt } from 'passport-jwt';

const cookieExtractor = (req) => {
  const token = req.cookies.token;
  return token;
};

export const cookieStrategyOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: '0303456',
};
