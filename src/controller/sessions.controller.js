
const sessionGetRegister = (req, res) => {
  res.status(200).render("register", {
    style: "register.css",
    title: "Register",
  });
}
const sessionPostRegister = (req, res) => {
  if (!req.user) {
    return res.json({ error: "something went wrong" });
  }
  
  req.session.user = {
    _id: req.user._id,
    email: req.user.email, 
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    rol: req.user.rol,
    cart:req.user.cart  
  };
  let session = req.session.user
  let rol = req.session.user.rol
    const data={
        title:'Profile',
        style:'profile.css',
        data:session,
        status:'success'
    }
    data[rol] = session
    res.status(200).render('profile', data) 
}
const sessionGetLogin = (req, res) => {
  res.status(200).render("login", {
    style: "login.css",
    title: "Login",
  });
}
const sessionPostLogin = (req, res) => {
  if (!req.user) {
    return res.json({ error: "invalid credentials" });
  }
  req.session.user = {
    _id: req.user._id,
    email: req.user.email, 
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    rol: req.user.rol,
    cart:req.user.cart  
  };
  let session = req.session.user
  let rol = req.session.user.rol
    const data={
        title:'Profile',
        style:'profile.css',
        data:session,
        status:'success'
    }
    data[rol]= session
    res.status(200).render('profile', data)

}
const sessionGetProfile = (req, res) => {
    let session = req.session.user
    let rol = req.session.user.rol
    const data={
        title:'Profile',
        style:'profile.css',
        data:session
    }
    data[rol]= session
    res.render('profile', data) 
}
const sessionGetLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) res.send("Failed Logout");
    return res.status(200).redirect(200,"/session/login");
  });
}
const sessionGetFailedRegister = (req, res) => {
  res.send("failed user registration");
}
const sessionGetError = (req,res)=> {
  res.render('error404',{
      style:'error404.css',
      title:'Error 404'
     })
}
 

module.exports = {
  sessionGetRegister,
  sessionPostRegister,
  sessionGetLogin,
  sessionPostLogin,
  sessionGetProfile,
  sessionGetLogout,
  sessionGetFailedRegister,
  sessionGetError 
};


