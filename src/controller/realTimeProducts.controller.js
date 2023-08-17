const serviceProduct = require('../dao/mongo/services/products.services')
const Service = new serviceProduct()
 
const Product = require("../dao/mongo/models/products.model");

const getRealTimeProducts = (req, res) => {
  let session = req.session.user
  let rol = req.session.user.rol  
  Product.find({})
    .lean()
    // Service.getAllProducts()
    .then((pr) => {
      const data={ 
        products: pr,
        style: "realtimeproducts.css",
        title: "RealTimeProducts",
    }
      data[rol] = session
      res.render("realTimeProducts",data);
    })
    .catch((err) => {
      res.status(500).send(console.log("Error loading product"));
    });
}

const getRealTimeError = () => {
  res.render("error404", {
    style: "error404.css",
    title: "Error 404",
  });
}


module.exports = {
  getRealTimeProducts,
  getRealTimeError
}



// router.get("/", isAdmin, (req, res) => {
//   let session = req.session.user
//   let rol = req.session.user.rol 
//   Product.find({})
//     .lean()
//     .then((pr) => {
//       const data={ 
//         products: pr,
//         style: "realtimeproducts.css",
//         title: "RealTimeProducts",
//         session: session
//     }
//     data[rol]= session
//       res.render("realTimeProducts", {data});
//     })
//     .catch((err) => {
//       res.status(500).send(console.log("Error loading product"));
//     });
// });

// router.get("*", () => {
//   res.render("error404", {
//     style: "error404.css",
//     title: "Error 404",
//   });
// });