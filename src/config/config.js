// require('dotenv').config({path:'src/.env'})
const dotenv = require('dotenv')
dotenv.config({path:'src/.env'})

module.exports = {
    port:process.env.PORT || 8080,
    mongoUrl: process.env.MONGO_URL,
    secret: process.env.SECRET, 
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
}