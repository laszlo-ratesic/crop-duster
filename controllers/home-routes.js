const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('stream');
});

router.get('/stream', (req, res) => {
  res.render('stream');
});

router.get('/dashboard', (req, res) => {
  if (req.session.loggedIn) {
    res.render('dashboard', {
      loggedIn: req.session.loggedIn,
      id: req.session.user_id,
      username: req.session.username,
    });
  } else {
    res.redirect('/sign-in');
  }
});

router.get('/sign-in', (req, res) => {
  res.render('sign-in', { layout: 'auth.hbs' });
});

router.get('/sign-up', (req, res) => {
  res.render('sign-up', { layout: 'auth.hbs' });
});

router.get('/sign-out', (req, res) => {
  res.render('sign-out', { layout: 'auth.hbs' });
});

router.get('/forgot-password', (req, res) => {
  res.render('forgot-password', { layout: 'auth.hbs' });
});

router.get('/pricing', (req, res) => {
  res.render('pricing');
});

router.get('/profile', (req, res) => {
  res.render('profile');
});

router.get('/settings', (req, res) => {
  res.render('settings');
});

router.get('/billing', (req, res) => {
  res.render('billing');
});

module.exports = router;
