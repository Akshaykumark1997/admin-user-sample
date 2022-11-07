const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("admin/login_admin");
  next();
});

module.exports = router;
