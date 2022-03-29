const router = require("express").Router();
const homeRoutes = require("./home-routes");
const errorRoutes = require('./error-routes');

router.use("/", homeRoutes);
router.use('/error', errorRoutes);

router.use((req, res) => {
  res.status(404).redirect('/error/404');
});

module.exports = router;