const dotenv = require('dotenv')
dotenv.config({path:'src/.env'})

module.exports = {
    port:process.env.PORT || 3000,
    mongoUrl: process.env.MONGO_URL,
    secret: process.env.SECRET, 
    githubClientId: process.env.CLIENT_ID_GITHUB,
    githubSecret: process.env.CLIENT_SECRET_GITHUB,
    githubCallBack: process.env.CALL_BACK_URL_GITHUB
}