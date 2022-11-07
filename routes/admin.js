const express = require("express");
const router = express.Router();

const loginDetails = {
    email:"akshayajith@gmail.com",
    password:"akshay123"
};

router.get("/", (req, res, next) => {
  session = req.session;
  if (session.adminId) {
    res.render("admin/homepage_admin");
  } else {
    res.render("admin/login_admin");
  }
});
router.post('/adminlogin',(req,res)=>{
    if (
      req.body.email === loginDetails.email &&
      req.body.password === loginDetails.password
    ) {
      session = req.session;
      session.adminId = req.body.email;
      console.log(req.session);
      res.redirect('adminhome');
    } else {
      res.render("admin/login_admin", { err_message: "username or password incorrect" });
    }
})
router.get('/adminhome',(req,res)=>{
     session = req.session;
     if (session.adminId) {
       res.render('admin/homepage_admin');
     } else {
       res.render("admin/login_admin");
     }
})
router.get("/adminlogout", (req, res) => {
  req.session.destroy();
  res.redirect("/admin");
});
module.exports = router;
