const express = require("express");
const { isAdminPrimium} = require("../middlewares/auth.middleware");
const {
    getWithQuerys,
    getProductById,
    addProduct,
    addManyProducts,
    deleteProduct,
    updateProduct, 
    getProductError 
   } = require ('../controller/products.controller');
const router = new express.Router();
router.use(express.json()); 
router.use(express.urlencoded({ extended: true }));

router.get("/", getWithQuerys);
router.get("/:pid", isAdminPrimium, getProductById);  
router.post("/",isAdminPrimium, addProduct);
router.post("/many", isAdminPrimium, addManyProducts);
router.delete("/:pid", isAdminPrimium, deleteProduct); 
router.put("/:id", isAdminPrimium,updateProduct);
router.get("*", getProductError);

module.exports = router;
