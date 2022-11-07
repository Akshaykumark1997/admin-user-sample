const express = require("express");
const user = require("../helpers/user_details");
const sessions = require("express-session");
const cookieParser = require("cookie-parser");
const db = require("../confi/connection");
const { response } = require("express");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());
router.use(
  sessions({
    secret: "123",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 30000 },
  })
);
router.use((req, res, next) => {
  res.header(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});
router.get("/", (req, res) => {
  let user = req.session.user;
  console.log(user);
  if (user) {
    res.render("user/homepage_user");
  } else {
    res.render("user/login_user");
  }
});
router.post("/login", (req, res) => {
  user.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true;
      console.log(req.session);
      req.session.user = response.user;
      res.redirect("/home");
    } else {
      res.redirect("/");
    }
  });
});
router.get("/home", (req, res) => {
  let user = req.session.user;
  console.log(user);
  if (user) {
    res.render("user/homepage_user");
  } else {
    res.render("user/login_user");
  }
});

router.get("/signup", (req, res, next) => {
  res.render("user/signup_user");
  next();
});
router.post("/signup", (req, res) => {
  console.log(req.body);
  if (req.body.password === req.body.repeatpassword) {
    user.addUser(req.body).then((data) => {
      console.log(data);
      res.redirect("/");
    });
  } else {
    res.render("user/signup_user", {
      err_message: "password must be same",
    });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
