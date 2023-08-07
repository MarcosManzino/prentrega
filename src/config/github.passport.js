const passport = require('passport')
const gitHubStrategy = require('passport-github2').Strategy
const User = require('../dao/models/users.model')


const gitHubPassport = () =>{
    passport.use('auth-github', new gitHubStrategy(
        {
            clientID: config.CLIENT_ID,
            clientSecret: config.CLIENT_SECRET,
            callbackURL: "http://localhost:8080/auth/github/callback"
        },
        async (accessToken, refreshToken, profile, done)=>{
            try{
              console.log(profile)
                let userFound = await User.findOne({email:profile._json.email})
                if(userFound){
                    console.log('User already exists')
                    done(null,false)
                }
                let userNew = {
                    first_name: profile._json.name,
                    last_name:profile._json.name,
                    email:profile._json.email,
                    age: 18,
                    password:'1', 
                    rol: 'User'
                }
                let result = await User.create(userNew)
                done(null, result)
            }
            catch (err){
                return done('Error creating user' + err)
            }
          } 
    ))

}

module.exports = gitHubPassport
