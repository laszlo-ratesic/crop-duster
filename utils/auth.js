const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect('/sign-in');
  } else {
    next();
  }
};

module.exports = withAuth;