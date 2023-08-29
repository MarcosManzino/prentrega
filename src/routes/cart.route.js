const express = require('express')
const { isUser, isAdmin } = require("../controller/middlewares/auth.middleware");
const { getCart, postCart, getCartById, postCartProductsById, delCartById, delCartProductById, putCartById, putCartProductsById, getCartError,purchase} = require ('../controller/cart.controller')
const { Router } = express
const router = new Router()

router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.get('/', isAdmin, getCart)
router.get('/:cId', isAdmin, getCartById)
router.post('/', isAdmin, postCart)
router.post('/:cId/product/:pId', isAdmin, postCartProductsById)
router.delete('/:cId', isAdmin, delCartById)
router.delete('/:cId/product/:pId', isAdmin, delCartProductById)
router.put('/:cId', isAdmin, putCartById)
router.put('/:cId/product/:pId', isAdmin, putCartProductsById)

router.post('/purchase', purchase)
router.get('*', getCartError)

module.exports = router


