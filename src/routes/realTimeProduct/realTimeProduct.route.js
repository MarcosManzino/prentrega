const express = require("express");
const { Router } = express;
const router = new Router();
const { isUser, isAdmin } = require("../../middlewares/middleware.auth");

const Product = require("../../dao/models/products.model");

router.get("/", isAdmin, (req, res) => {
  let session = req.session.user
  let rol = req.session.user.rol 
  Product.find({})
    .lean()
    .then((pr) => {
      const data={
        products: pr,
        style: "realtimeproducts.css",
        title: "RealTimeProducts",
        session: session
    }
    data[rol]= session
      res.render("realTimeProducts", {data});
    })
    .catch((err) => {
      res.status(500).send(console.log("Error loading product"));
    });
});

router.get("*", () => {
  res.render("error404", {
    style: "error404.css",
    title: "Error 404",
  });
});

module.exports = router;
