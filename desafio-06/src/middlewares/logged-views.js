export const isLogged = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/views/login');
  } else {
    next();
  }
};
