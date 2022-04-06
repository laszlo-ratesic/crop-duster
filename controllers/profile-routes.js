const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', (req, res) => {
  if (req.session.id) {
    Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ['id', 'title', 'subtitle', 'post_text', 'created_at'],
      include: [
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'post_id',
            'user_id',
            'created_at',
          ],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    })
      .then((dbPostData) => {
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        res.render('profile', {
          posts,
          loggedIn: req.session.loggedIn,
          id: req.session.user_id,
          username: req.session.username,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  } else {
    res.redirect('/sign-in');
  }
});

router.get('/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'username'],
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'subtitle', 'post_text', 'created_at'],
        include: [
          {
            model: Comment,
            attributes: [
              'id',
              'comment_text',
              'post_id',
              'user_id',
              'created_at',
            ],
            include: {
              model: User,
              attributes: ['username'],
            },
          },
        ],
      },
    ],
  })
    .then((dbUserData) => {
      const user = dbUserData.get({ plain: true });
      res.render('profile', {
        user,
        loggedIn: req.session.loggedIn,
        id: req.session.user_id,
        username: req.session.username,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
