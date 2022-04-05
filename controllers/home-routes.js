const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', (req, res) => {
  res.redirect('/stream');
});

// GET one post (SINGLE PAGE VIEW)
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title', 'subtitle', 'post_text', 'created_at'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['id', 'username'],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        res.render('error-404');
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn,
        id: req.session.user_id,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/sign-in', (req, res) => {
  res.render('sign-in', { layout: 'auth.hbs' });
});

router.get('/sign-up', (req, res) => {
  res.render('sign-up', { layout: 'auth.hbs' });
});

router.get('/sign-out', (req, res) => {
  if (req.session.loggedIn) {
    res.render('sign-out', { layout: 'auth.hbs' });
  }
});

router.get('/forgot-password', (req, res) => {
  res.render('forgot-password', { layout: 'auth.hbs' });
});

router.get('/doodle', (req, res) => {
  res.render('doodle', { layout: 'auth.hbs' });
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
