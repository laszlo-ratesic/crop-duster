const router = require("express").Router();
const homeRoutes = require("./home-routes");

router.use("/", homeRoutes);

router.use((req, res) => {
  res.render("404-error");
  res.status(404).end();
});

module.exports = router;