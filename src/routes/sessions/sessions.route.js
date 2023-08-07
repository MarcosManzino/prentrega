const express = require("express");
const UserServices = require("../services/users.services");
const { isValidPass } = require("../../utils/bcrypt");
const Service = new UserServices();
const passport = require("passport");
const { isUser, isAdmin } = require("../../middlewares/middleware.auth");

const { Router } = express;
const router = new Router();

router.get("/register", (req, res) => {
  res.status(200).render("register", {
    style: "register.css",
    title: "Register",
  });
});
router.post(
  "/register",
  passport.authenticate("register-passport", {
    failureRedirect: "/sessions/failed-register",
  }),
  (req, res) => {
    if (!req.user) {
      return res.json({ error: "something went wrong" });
    }
    req.session.user = {
      _id: req.user._id,
      email: req.user.email,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      rol: req.user.rol,
      cart:req.user.cart._id
    };
    // return res.json({ msg: 'ok', payload: req.user });
    return res.redirect("/products");
  }
);

router.get("/login", (req, res) => {
  res.status(200).render("login", {
    style: "login.css",
    title: "Login",
  });
});
router.post("/login",passport.authenticate("login-passport", {failureRedirect: "/session/register",}),(req, res) => {
    if (!req.user) {
      return res.json({ error: "invalid credentials" });
    }
    req.session.user = {
      _id: req.user._id,
      email: req.user.email,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      rol: req.user.rol,
      cart:req.user.cart._id
    };
    // return res.json({ msg: 'ok', payload: req.user });
    return res.redirect("/session/profile");
  }
);

router.get("/profile", (req, res) => {
  let session = req.session.user
    let rol = req.session.user.rol 
    console.log(req.session.user)  
        const data={
            title:'Profile',
            style:'profile.css',
            data:session
        }
        data[rol]= session
        res.render('profile', data) 
});
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) res.send("Failed Logout");
    return res.redirect("/session/login");
  });
});
router.get("/failed-register", (req, res) => {
  res.send("failed user registration");
});

router.get('*', (req,res)=> {
    res.render('error404',{
        style:'error404.css',
        title:'Error 404'
       })
})

module.exports = router;
