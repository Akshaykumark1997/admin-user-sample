const express = require("express");
const admin = require("../helpers/admin_helper");
const db = require("../confi/connection");
const { response } = require("express");
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
    //console.log(allUsers);
    let session = req.session;
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

});

router.get("/adminlogout", (req, res) => {
  req.session.destroy();
  res.redirect("/admin");
});
router.get('/deleteuser/:id',(req,res)=>{
  let id = req.params.id;
  console.log(req.params.id);
  admin.deleteUser(id).then((response)=>{
    res.redirect('/admin/adminhome');
  });
});
router.get('/adduser',(req,res)=>{
 let session = req.session;
  if (session.adminId) {
    res.render("admin/addUser");
  } else {
    res.render("admin/login_admin");
  }
  
});
router.post('/submitUser',(req,res)=>{
  admin.addUser(req.body).then((data)=>{
    res.redirect('/admin/adminhome');
  });
});
router.get('/editUser/:id',async(req,res)=>{
  let session= req.session;
  if(session.adminId){
    let editId = await admin.editUser(req.params.id);
    console.log(editId);
    res.render('admin/editUser',{editId});
  }
});
router.post('/editUser/:id',(req,res)=>{
  admin.editUserDetails(req.params.id,req.body).then(()=>{
    res.redirect('/admin/adminhome');
  });
});
// router.post('/search',(req,res)=>{
//   let session = req.session;
//   let searchInput = req.body.search;
//   if(session.adminId){
//     if(searchInput){
//       console.log(searchInput);
//       admin.searchUser(searchInput).then((allUsers)=>{
//         console.log(allUsers);
//         res.render("admin/homepage_admin", { allUsers });
//       })
//     }else{
//       res.redirect('/admin/adminhome');
//     }
//   }
// }) 
module.exports = router;
