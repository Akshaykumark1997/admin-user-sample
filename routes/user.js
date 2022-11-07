const express = require("express");
const user = require("../helpers/user_details");
const sessions = require("express-session");
const cookieParser = require("cookie-parser");
const db = require("../confi/connection");
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
  session = req.session;
  if (session.userid) {
    res.render('user/homepage_user');
  } else {
    res.render("user/login_user");
  }
});
router.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  //  console.log(req.body.email);
  //  console.log(req.body.password);
  user.findUser(email).then((userDetails) => {
     console.log(userDetails);
     if (req.body.email === userDetails.email &&req.body.password === userDetails.password) {
       session = req.session;
       session.userid = req.body.email;
       res.redirect("/home");
     } else {
       res.render("user/login_user", {
         err_message: "username or password incorrect",
       });
     }
    //  console.log(userDetails.email);
    //  console.log(userDetails.password);

  });
});
router.get("/home", (req, res) => {
  session = req.session;
  if (session.userid) {
    res.render("user/homepage_user");
  } else {
    res.redirect("/");
  }
});
router.get("/signup", (req, res, next) => {
  res.render("user/signup_user");
  next();
});
router.post("/signup", (req, res) => {
  console.log(req.body);
  if (req.body.password === req.body.repeatpassword) {
    user.addUser(req.body, (result) => {
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
// router.get("/home", (req, res, next) => {
//   res.render("user/homepage_user");
//   next();
// });
// router.get("/home", (req, res) => {
//   session = req.session;
//   if (session.userid) {
//     res.render("user/homepage_user");
//   } else {
//     res.redirect("/");
//   }
// });
// router.get("/", (req, res, next) => {
//   res.render("user/login_user");
//   next();
// });
// req.body.email === userDetails.email && req.body.password === userDetails.password
// userDetails.email === req.body.email &&userDetails.password === req.body.password;