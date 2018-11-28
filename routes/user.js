const express = require("express");
const router = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");
const config = require("../config");
const passport = require('passport')

router.route("/").get((req, res) => {
  res.redirect("/user/login");
});
//LOGIN
router.get("/login",(req,res)=>{
    res.render("login");
})
  
router.post("/login",passport.authenticate('local',{
    successRedirect:'/images',
    failureRedirect:'/login',
    failureFlash: true
}))
   

//REGISTRO
router
  .route("/register")
  .get((req, res) => {
    res.send("Register Home");
  })
  .post(async(req, res) => {
    const newUser = new User();
    newUser.username = req.body.username
    let password = req.body.password
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    res.redirect('/');
    
     
  });

router.route("/userlist").get((req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      throw err;
    } else {
      
            res.status(200).send(users);
        
      }
    
  });
});

router.route("/:id").get((req, res) => {
    let _id = req.params.id;
    User.findById(_id, (err, user) => {
      if (err) {
        throw err;
      } else {
        res.send(user);
      }
    });
  });
module.exports = router;
