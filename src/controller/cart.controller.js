
const Product= require('../dao/mongo/models/products.model')
const Cart= require('../dao/mongo/models/cart.model')

const CartService= require('../dao/mongo/services/cart.services')
const cartService = new CartService()


const getCart = (req,res)=> {
    Cart.find({}).lean()
    .then(pr=>{
        res.status(200).send(
            {
                status:'success',
                msg:'cart Find',
                data:pr
            }
        )
    })
    .catch(err=>{
        res.status(500).send(
            console.log('Error loading product')
        )
    })  
     
}
const postCart = (req,res)=> {
    let data = req.body
    let cart = new Cart(data) 
    cart.save()
    .then(pr=>{
        res.status(201).send({
            msg:'Cart create successfully',
            data:data
        })
    })
    .catch(err=>{
        res.status(500).send(
            console.log('Error create Cart')
        )
    })
}
const getCartById = (req,res)=> {
    const cId = req.params.cId
    Cart.findOne({_id:cId})
    .then(pr=>{
        res.status(200).send(
            {
                status:'success',
                msg:'cart Find',
                data:pr
            }
        )
    })
    .catch(err=>{
        res.status(500).send(
            console.log('Error get Cart')
        )
    })  
}
const postCartProductsById = (req,res)=>{
    const cId = req.params.cId
    const pId = req.params.pId
    Cart.findOne({_id:cId})
    .then(pr=>{
        let arr= pr.products
        let prIndex=arr.findIndex(pr=> pr.product._id.toString() === pId)
        if (prIndex != -1) {
                arr[prIndex].quantity++
                let prodnew=[]
                for (let prop of arr){
                    prodnew.push({product:prop.product._id.toString(),quantity:prop.quantity})
                }
                pr.products = prodnew
                Cart.updateOne({_id:cId},pr)
                .then(pr=>{
                    res.status(200).send(
                        {
                            status:'success',
                            msg:'Product added to cart',
                            data:pr
                        }
                    )
                })
                .catch(err=>{
                    res.status(500).send({
                        status: 'error',
                        msg: 'something went wrong :(',
                        data: {},
                    })
                })
        }
        else{
            pr.products.push({ product:pId, quantity:1})
            Cart.updateOne({_id:cId},pr)
            .then(pr=>{
                res.status(200).send(
                    {
                        status:'success',
                        msg:'Product added to cart',
                        data:pr
                    }
                )
            })
            .catch(err=>{
                res.status(500).send({
                    status: 'error',
                    msg: 'something went wrong :(',
                    data: {},
                })
            })
       }
    })
    .catch(err=>{
        res.status(500).send({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        })
    }) 
}
const delCartById = async (req,res)=>{
    let id = req.params.cId
    Cart.findOne({_id:id})
    .then(pr=>{
        let arr=[]
        pr.products=arr
        Cart.updateOne({_id:id}, pr)
        .then(pr=>{
            res.status(200).send({
                status:'success',
                msg:'Products empty',
                data:pr
            })
        })
        .catch(err=>{
            res.status(500).send({
                status:'error',
                msg:'Error: something went wrong :(',
                data:{}
            })
        })
    })
    .catch(err =>{
        res.status(500).send({
            status: 'error',
            msg: 'something went wrong :(',
            data: {}
        })
    }) 
}
const delCartProductById = (req,res)=>{
    const cId = req.params.cId
    const pId = req.params.pId
    Cart.findOne({_id:cId})
    .then(pr=>{
        let arr= pr.products 
        let prIndex=arr.findIndex(pr=> pr.product._id.toString() === pId)
        if (prIndex != -1) {
                arr.splice(prIndex, 1)
                let prodnew=[]
                for (let prop of arr){
                    prodnew.push({product:prop.product._id.toString(),quantity:prop.quantity})
                }
                pr.products = prodnew
                console.log(pr)
                Cart.updateOne({_id:cId},pr)
                .then(pr=>{
                    res.status(200).send(
                        {
                            status:'success',
                            msg:'Product Delete to cart',
                            data:pr
                        }
                    )
                })
                .catch(err=>{
                    res.status(500).send({
                        status: 'error',
                        msg: 'something went wrong :(',
                        data: {},
                    })
                })
        }
        else{
                res.status(200).send(
                    {
                        status:'success',
                        msg:'Product not found or dont exist',
                        data:pr
                    }
                )
            
          
       }
    })
    .catch(err=>{
        res.status(500).send({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        })
    }) 
}
const putCartById = (req,res)=>{
    let cId = req.params.cId
    let data = req.body
    Cart.findOne({_id:cId})
    .then(pr=>{
        let arr = data
        pr.products=arr
        Cart.updateOne({_id:cId},pr)
                .then(pr=>{
                    res.status(200).send(
                        {
                            status:'success',
                            msg:'Products update',
                            data:pr
                        }
                    )
                })
                .catch(err=>{
                    res.status(500).send({
                        status: 'error',
                        msg: 'something went wrong :(',
                        data: {},
                    })
                })
    })
    .catch(err=>{
        res.status(500).send({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        })
    }) 
}
const putCartProductsById = (req,res)=>{
    let cId = req.params.cId
    let pId = req.params.pId
    let {data} = req.body
    Cart.findOne({_id:cId})
    .then(pr=>{
        let arr= pr.products
        let prIndex=arr.findIndex(pr=> pr.product._id.toString() === pId)
        if (prIndex != -1) {
                arr[prIndex].quantity = parseInt(data)
                let prodnew=[]
                for (let prop of arr){
                    prodnew.push({product:prop.product._id.toString(),quantity:prop.quantity})
                }
                pr.products = prodnew
                Cart.updateOne({_id:cId},pr)
                .then(pr=>{
                    res.status(200).send(
                        {
                            status:'success',
                            msg:'Product quantity update',
                            data:pr
                        }
                    )
                })
                .catch(err=>{
                    res.status(500).send({
                        status: 'error',
                        msg: 'something went wrong :(',
                        data: {},
                    })
                })
        }
        else{
            res.status(200).send(
                {
                    status:'success',
                    msg:'Product not found or dont exist',
                    data:pr
                }
            )
       }
    })
    .catch(err=>{
        res.status(500).send({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        })
    }) 
}
const getCartError =  (req,res)=> {
    res.render('error404',{
        style:'error404.css',
        title:'Error 404'
       })
}
 
module.exports = {
    getCart,
    postCart,
    getCartById,
    postCartProductsById,
    delCartById,
    delCartProductById,
    putCartById,
    putCartProductsById,
    getCartError
}



// router.get('/', isAdmin, (req,res)=> {
//     Cart.find({}).lean()
//     .then(pr=>{
//         res.status(200).send(
//             {
//                 status:'success',
//                 msg:'cart Find',
//                 data:pr
//             }
//         )
//     })
//     .catch(err=>{
//         res.status(500).send(
//             console.log('Error loading product')
//         )
//     })  
     
// })

// router.post('/', isAdmin, (req,res)=> {
//     let data = req.body
//     let cart= new Cart(data) 
//     cart.save()
//     .then(pr=>{
//         res.status(201).send({
//             msg:'Cart create successfully',
//             data:data
//         })
//     })
//     .catch(err=>{
//         res.status(500).send(
//             console.log('Error create Cart')
//         )
//     })
// })

// router.get('/:cId', isAdmin, (req,res)=> {
//     const cId = req.params.cId
//     Cart.findOne({_id:cId})
//     .then(pr=>{
//         res.status(200).send(
//             {
//                 status:'success',
//                 msg:'cart Find',
//                 data:pr
//             }
//         )
//     })
//     .catch(err=>{
//         res.status(500).send(
//             console.log('Error get Cart')
//         )
//     })  
// })

// router.post('/:cId/product/:pId', isAdmin, (req,res)=>{
//     const cId = req.params.cId
//     const pId = req.params.pId
//     Cart.findOne({_id:cId})
//     .then(pr=>{
//         let arr= pr.products
//         let prIndex=arr.findIndex(pr=> pr.product._id.toString() === pId)
//         if (prIndex != -1) {
//                 arr[prIndex].quantity++
//                 let prodnew=[]
//                 for (let prop of arr){
//                     prodnew.push({product:prop.product._id.toString(),quantity:prop.quantity})
//                 }
//                 pr.products = prodnew
//                 Cart.updateOne({_id:cId},pr)
//                 .then(pr=>{
//                     res.status(200).send(
//                         {
//                             status:'success',
//                             msg:'Product added to cart',
//                             data:pr
//                         }
//                     )
//                 })
//                 .catch(err=>{
//                     res.status(500).send({
//                         status: 'error',
//                         msg: 'something went wrong :(',
//                         data: {},
//                     })
//                 })
//         }
//         else{
//             pr.products.push({ product:pId, quantity:1})
//             Cart.updateOne({_id:cId},pr)
//             .then(pr=>{
//                 res.status(200).send(
//                     {
//                         status:'success',
//                         msg:'Product added to cart',
//                         data:pr
//                     }
//                 )
//             })
//             .catch(err=>{
//                 res.status(500).send({
//                     status: 'error',
//                     msg: 'something went wrong :(',
//                     data: {},
//                 })
//             })
//        }
//     })
//     .catch(err=>{
//         res.status(500).send({
//             status: 'error',
//             msg: 'something went wrong :(',
//             data: {},
//         })
//     }) 
// })

// router.delete('/:cId', isAdmin, async (req,res)=>{
//     let id = req.params.cId
//     Cart.findOne({_id:id})
//     .then(pr=>{
//         let arr=[]
//         pr.products=arr
//         Cart.updateOne({_id:id}, pr)
//         .then(pr=>{
//             res.status(200).send({
//                 status:'success',
//                 msg:'Products empty',
//                 data:pr
//             })
//         })
//         .catch(err=>{
//             res.status(500).send({
//                 status:'error',
//                 msg:'Error: something went wrong :(',
//                 data:{}
//             })
//         })
//     })
//     .catch(err =>{
//         res.status(500).send({
//             status: 'error',
//             msg: 'something went wrong :(',
//             data: {}
//         })
//     }) 
// })

// router.delete('/:cId/product/:pId', isAdmin, (req,res)=>{
//     const cId = req.params.cId
//     const pId = req.params.pId
//     Cart.findOne({_id:cId})
//     .then(pr=>{
//         let arr= pr.products 
//         let prIndex=arr.findIndex(pr=> pr.product._id.toString() === pId)
//         if (prIndex != -1) {
//                 arr.splice(prIndex, 1)
//                 let prodnew=[]
//                 for (let prop of arr){
//                     prodnew.push({product:prop.product._id.toString(),quantity:prop.quantity})
//                 }
//                 pr.products = prodnew
//                 console.log(pr)
//                 Cart.updateOne({_id:cId},pr)
//                 .then(pr=>{
//                     res.status(200).send(
//                         {
//                             status:'success',
//                             msg:'Product Delete to cart',
//                             data:pr
//                         }
//                     )
//                 })
//                 .catch(err=>{
//                     res.status(500).send({
//                         status: 'error',
//                         msg: 'something went wrong :(',
//                         data: {},
//                     })
//                 })
//         }
//         else{
//                 res.status(200).send(
//                     {
//                         status:'success',
//                         msg:'Product not found or dont exist',
//                         data:pr
//                     }
//                 )
            
          
//        }
//     })
//     .catch(err=>{
//         res.status(500).send({
//             status: 'error',
//             msg: 'something went wrong :(',
//             data: {},
//         })
//     }) 
// })

// router.put('/:cId', isAdmin, (req,res)=>{
//     let cId = req.params.cId
//     let data = req.body
//     Cart.findOne({_id:cId})
//     .then(pr=>{
//         let arr = data
//         pr.products=arr
//         Cart.updateOne({_id:cId},pr)
//                 .then(pr=>{
//                     res.status(200).send(
//                         {
//                             status:'success',
//                             msg:'Products update',
//                             data:pr
//                         }
//                     )
//                 })
//                 .catch(err=>{
//                     res.status(500).send({
//                         status: 'error',
//                         msg: 'something went wrong :(',
//                         data: {},
//                     })
//                 })
//     })
//     .catch(err=>{
//         res.status(500).send({
//             status: 'error',
//             msg: 'something went wrong :(',
//             data: {},
//         })
//     }) 
// })

// router.put('/:cId/product/:pId', isAdmin, (req,res)=>{
//     let cId = req.params.cId
//     let pId = req.params.pId
//     let {data} = req.body
//     Cart.findOne({_id:cId})
//     .then(pr=>{
//         let arr= pr.products
//         let prIndex=arr.findIndex(pr=> pr.product._id.toString() === pId)
//         if (prIndex != -1) {
//                 arr[prIndex].quantity = parseInt(data)
//                 let prodnew=[]
//                 for (let prop of arr){
//                     prodnew.push({product:prop.product._id.toString(),quantity:prop.quantity})
//                 }
//                 pr.products = prodnew
//                 Cart.updateOne({_id:cId},pr)
//                 .then(pr=>{
//                     res.status(200).send(
//                         {
//                             status:'success',
//                             msg:'Product quantity update',
//                             data:pr
//                         }
//                     )
//                 })
//                 .catch(err=>{
//                     res.status(500).send({
//                         status: 'error',
//                         msg: 'something went wrong :(',
//                         data: {},
//                     })
//                 })
//         }
//         else{
//             res.status(200).send(
//                 {
//                     status:'success',
//                     msg:'Product not found or dont exist',
//                     data:pr
//                 }
//             )
//        }
//     })
//     .catch(err=>{
//         res.status(500).send({
//             status: 'error',
//             msg: 'something went wrong :(',
//             data: {},
//         })
//     }) 
// })

// router.get('*', (req,res)=> {
//     res.render('error404',{
//         style:'error404.css',
//         title:'Error 404'
//        })
// })


