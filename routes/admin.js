const express = require("express");
const admin = require("../helpers/admin_helper");
const db = require("../confi/connection");
const router = express.Router();
const loginDetails = {
    email:"akshay@a",
    password:"12"
};

router.get("/", (req, res, next) => {
    session = req.session;
    if (session.adminId) {
    res.redirect('/admin/adminhome');
    } else {
    res.render("admin/login_admin");
    }
});
router.get("/adminhome", (req, res) => {
  admin.getAllUsers().then((allUsers) => {
    console.log(allUsers);
    session = req.session;
    if (session.adminId) {
      res.render("admin/homepage_admin", { allUsers });
    } else {
      res.redirect('/admin');
    }
  });
});
router.post('/adminlogin',(req,res)=>{  
    if (
      req.body.email === loginDetails.email &&
      req.body.password === loginDetails.password
    ) {
      req.session.adminId = req.body.email;
      console.log(req.session);
      res.redirect('/admin/adminhome');
    } else {
      res.render("admin/login_admin", { err_message: "username or password incorrect" });
    }

})

router.get("/adminlogout", (req, res) => {
  req.session.destroy();
  res.redirect("/admin");
});    
module.exports = router;
