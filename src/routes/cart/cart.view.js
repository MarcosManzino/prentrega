// Además, agregar una vista en ‘/carts/:cid (cartId) para visualizar un carrito específico,
// donde se deberán listar SOLO los productos que pertenezcan a dicho carrito. 
const express= require('express')
const CartView = express.Router()
const Cart= require('../../dao/models/cart.model')
const cartService= require('../services/cart.services')
const Service = new cartService()
const { isUser, isAdmin } = require("../../middlewares/middleware.auth");

  
CartView.use(express.json())
CartView.use(express.urlencoded({extended:true}))

CartView.get('/', isUser, async(req,res)=>{
    let session =req.session.user
    let id = req.session.user.cart
    console.log(id)
    // let id = req.params.cId
    let cartData = await Cart.findOne({_id:id}).populate('products.product')
    // console.log(cartData) 
    const products= cartData.products.map(item=>{ 
        return {
            title:item.product.title,
            description:item.product.description,
            price:item.product.price,
            thumbnail: item.product.thumbnail,
            code: item.product.code,
            stock: item.product.stock, 
            category:item.product.category,
            status:true,
            _id:item.product._id,
            quantity:item.quantity
        }

    })
    
    return res.status(201).render('cart', {
        products:products, 
        style:'cart.css',
        title:'Cart',
        session:session
    }) 
})

module.exports= CartView