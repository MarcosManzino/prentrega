const express = require("express");
const {getProductsViews, getProductsViewsError} = require ('../controller/products.views.controller')
const productViews = express.Router();

productViews.get("/", getProductsViews);

productViews.get("*", getProductsViewsError);

module.exports = productViews;


// const ProductServices = require("../dao/mongo/services/products.services");
// const Service = new ProductServices();