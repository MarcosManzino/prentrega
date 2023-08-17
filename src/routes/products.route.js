const express = require("express");
const { isUser, isAdmin } = require("../controller/middlewares/auth.middleware");
const {getProducts,
  getProductsById,
  postProduct,
  postManyProducts,
  delProductById,
  putProductById,
  getProductError} = require ('../controller/products.controller')

const { Router } = express;
const router = new Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", getProducts);
router.get("/:id", isAdmin, getProductsById);  
router.post("/", isAdmin, postProduct);
router.post("/many", isAdmin, postManyProducts);
router.delete("/:id", isAdmin, delProductById);
router.put("/:id", isAdmin, putProductById);
router.get("*", getProductError);

module.exports = router;
