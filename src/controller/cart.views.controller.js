const Product= require('../dao/mongo/models/products.model')
const Cart= require('../dao/mongo/models/cart.model')
const cartService= require('../dao/mongo/services/cart.services')
const Service = new cartService()


const getCartView = async(req,res)=>{
    let session = req.session.user
    let rol = req.session.user.rol 
    let id = req.session.user.cart
    let cartData = await Cart.findOne({_id:id}).populate('products.product')
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
    const data={
        title:'Cart',
        products:products,
        style:'cart.css', 
    }
    data[rol]= session
    return res.status(201).render('cart', data) 
}

module.exports= {
    getCartView  
}

// CartView.get('/', isUser, async(req,res)=>{
//     let session =req.session.user
//     let id = req.session.user.cart
//     console.log(id)
//     // let id = req.params.cId
//     let cartData = await Cart.findOne({_id:id}).populate('products.product')
//     // console.log(cartData) 
//     const products= cartData.products.map(item=>{ 
//         return {
//             title:item.product.title,
//             description:item.product.description,
//             price:item.product.price,
//             thumbnail: item.product.thumbnail,
//             code: item.product.code,
//             stock: item.product.stock, 
//             category:item.product.category,
//             status:true,
//             _id:item.product._id,
//             quantity:item.quantity
//         }

//     })
    
//     return res.status(201).render('cart', {
//         products:products, 
//         style:'cart.css',
//         title:'Cart',
//         session:session
//     }) 
// })

