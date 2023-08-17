const express= require('express')
const CartView = express.Router()
const { isUser, isAdmin } = require("../controller/middlewares/auth.middleware");
const { getCartView } = require ('../controller/cart.views.controller')

// const Cart= require('../dao/mongo/models/cart.model')
// const cartService= require('../dao/mongo/services/cart.services')
// const Service = new cartService()
  
CartView.use(express.json())
CartView.use(express.urlencoded({extended:true}))

CartView.get('/', isUser, getCartView)

module.exports= CartView