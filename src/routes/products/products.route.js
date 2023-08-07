const express = require("express");
const Product = require("../../dao/models/products.model");
const ProductServices = require("../services/product.services.js");
const { isUser, isAdmin } = require("../../middlewares/middleware.auth");

const Service = new ProductServices();

const { Router } = express;
const router = new Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
  const { page, limit } = req.query;
  try {
    const dataproduct = await Service.getAll(page, limit);
    
    return res.status(200).json({
      status: "success",
      payload: dataproduct.docs,
      totalPages: dataproduct.totalPages,
      prevPages: dataproduct.prevPage,
      nextPages: dataproduct.nextPage,
      page: dataproduct.page,
      hasPrevPage: dataproduct.hasPrevPage,
      hasNextPage: dataproduct.hasNextPage,
      prevLink: dataproduct.hasPrevPage
        ? `http://localhost:8080/dataproduct/?page=${dataproduct.prevPage} `
        : null,
      nextLink: dataproduct.hasNextPage
        ? `http://localhost:8080/dataproduct/?page=${dataproduct.nextPage} `
        : null,
      
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});
router.get("/:id", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Service.getById(id);
    return product
      ? res.status(200).json({
          status: "success",
          msg: "Product Get by ID",
          data: product,
        })
      : res.status(200).json({
          status: "error",
          msg: "Product not found",
          data: product,
        });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});
router.post("/", isAdmin, async (req, res) => {
  try {
    const data = req.body;
    const productCreated = await Service.createOne(data);
    return res.status(201).json({
      status: "success",
      msg: "product created",
      data: productCreated,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});
router.post("/many", isAdmin, async (req, res) => {
  try {
    const data = req.body;
    const productCreated = await Service.createMany(data);
    return res.status(201).json({
      status: "success",
      msg: "product created",
      data: productCreated,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await Service.deletedOne(id);
    return res.status(200).json({
      status: "success",
      msg: "Product deleted",
      data: {},
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, thumbnail, code, stock, category, status } =
      req.body;
    const data = req.body;
    await Service.updateOne(
      id,
      title,
      description,
      thumbnail,
      code,
      stock,
      category,
      status
    );
    return res.status(201).json({
      status: "success",
      msg: "Product update",
      data: data,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});

router.get("*", () => {
  res.render("error404", {
    style: "error404.css",
    title: "Error 404",
  });
});

module.exports = router;
