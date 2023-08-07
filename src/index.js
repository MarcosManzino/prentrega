const express = require('express')
const app = express()
const {port, mongoUrl, secret} = require('./config/config')
// require('dotenv').config({path:'src/.env'})
// const PORT = process.env.PORT || 3000


//Mongo
const DataBase= require('./dao/mongoDao/db')
const Product= require('./dao/models/products.model')
const Chat= require('./dao/models/chat.model')

// Public Folder
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended:true}))

// Sessions requires
const session = require('express-session')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')
app.use(cookieParser()) 
app.use(session({
    store: MongoStore.create({
        mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true},
        // ttl:'',
        mongoUrl:mongoUrl
    }),
    secret:secret,
    resave:false,
    saveUninitialized:false

}))
// Passport Passport-Local
const initializePassport = require('./config/passport')
const passport = require('passport')
initializePassport() //Importante que este antes de el paasport.initialize
app.use(passport.initialize())
app.use(passport.session())

 

// Routes
//Products
const routesProduct = require('./routes/products/products.route')
app.use('/api/product', routesProduct)
const viewsProducts= require('./routes/products/products.view')
app.use('/products',viewsProducts)
//Cart
const routesCart = require('./routes/cart/cart.route') 
app.use('/api/cart', routesCart)
const viewsCart = require('./routes/cart/cart.view')
app.use('/cart', viewsCart)
// Users
const routesUsers = require('./routes/user/users.route')
app.use('/api/user',routesUsers)
// Sessions
const sessions = require('./routes/sessions/sessions.route')
app.use('/session', sessions)
const apiSession = require('./routes/sessions/session.api')
app.use('/api/session/', apiSession)
// auth.pasport
const authPassport = require('./routes/passport/auth.passport')
app.use('/auth', authPassport)
//Real time Products
const routesRealTime = require('./routes/realTimeProduct/realTimeProduct.route')
app.use('/realTimeProducts', routesRealTime)
// Chat
const routesChat = require('./routes/chat/chat.route')
app.use('/chat', routesChat)


// Handlebars
const handlebars = require('express-handlebars')
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views/')

// Sockets set
const {Server} = require('socket.io')
const http = require('http')
const server = http.createServer(app)
const io = new Server(server)

const messages = [] 
io.on('connection', (socket)=>{
    console.log('New User connected')
    socket.emit('wellcome','Wellcome new User') 

    // Comunicacion con realTimeProduct.js
    socket.on('addProduct' ,(data)=>{
        let product= new Product(data)
        product.save()
        .then(pr=>{

            Product.find({}).lean()
            .then(pr=>{
                io.sockets.emit('newData', pr)
            })
            .catch(err=>{
                res.status(500).send(
                    console.log('Error loading product')
                )
            })
        })
        .catch(err=>{
            res.status(500).send(
                console.log('Error loading product')
            )
        })   

    })
    socket.on('delProduct',(data)=>{
        let {id} =data
        console.log(id)
        Product.deleteOne({_id:id})
        .then(pr =>{ 
            Product.find({}).lean()
            .then(pr=>{
                io.sockets.emit('newData', pr)
            })
            .catch(err=>{
                res.status(500).send(
                    console.log('Error loading product')
                )
            })
        })
        .catch(err=>{
            res.status(500).send(
                console.log('Error Delete product')
            )
        })
        
    })

    // Chat sockets
    socket.on('new-message', (data)=>{
        
            Chat.findOne({user:data.user }).exec()
            .then(pr=>{

                if(pr){
                    Chat.updateOne({_id:pr._id},data)
                    .then(pr=>{
                        messages.push(data)
                        io.sockets.emit('messages-all', messages)
                    })
                    .catch(err=>{
                        console.log('Error send message')   
                    })
                }
                else{
                    let chat= new Chat(data)
                    chat.save()
                    .then(pr=>{
                    messages.push(data)
                    io.sockets.emit('messages-all', messages)
                    })
                    .catch(err=>{
                        console.log('Error send message')   
                    })
                }
            })
    })

})

app.get('/', (req,res)=> {  
    if(req.session.user){
        let session = req.session.user
        let rol = req.session.user.rol 
        console.log(req.session.user) 
        const data={
            title:'ecommerce backend',
            message:'Ecommerce backend  Index',
            style:'style.css',
        }
        data[rol]= session
        res.render('index', data) 
    }
    else{
        const data={
            title:'ecommerce backend',
            message:'Ecommerce backend  Index',
            style:'style.css',
        }
        res.render('index', data) 
    }
})

server.listen(port, ()=>{
    console.log('Server is runing on port: ' + port)
    const database= new DataBase(mongoUrl)
    database.connect()
})

