const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("dashboard");
});

router.get("/profile", (req, res) => {
  res.render("profile");
});

router.get("/settings", (req, res) => {
  res.render("settings");
});

router.get("/billing", (req, res) => {
  res.render("billing");
});

router.get("/pricing", (req, res) => {
  res.render("pricing");
});

module.exports = router;
