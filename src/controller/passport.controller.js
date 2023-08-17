const getGithubCallBack = (req, res) => {
  req.session.user = req.user;
  res.redirect('/');
}

module.exports = {
  getGithubCallBack 
}

// router.get('/github',
//   passport.authenticate('auth-github', { scope: [ 'user:email' ] }));

// router.get('/github/callback', 
//   passport.authenticate('auth-github', { failureRedirect: '/session/register' }),
//   (req, res) => {
//     req.session.user = req.user;
//     // Successful authentication, redirect home.
//     res.redirect('/'); 
//     // res.send(JSON.stringify(req.user)) 

//   }); 

 