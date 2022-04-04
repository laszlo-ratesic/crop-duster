const router = require("express").Router();
const homeRoutes = require("./home-routes");
const apiRoutes = require("./api");
const errorRoutes = require("./error-routes");
const dashboardRoutes = require("./dashboard-routes");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/error", errorRoutes);
router.use("/dashboard", dashboardRoutes);

router.use((req, res) => {
  res.status(404).redirect("/error/404");
});

module.exports = router;
