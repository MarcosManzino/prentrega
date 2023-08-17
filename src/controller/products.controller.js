const ProductServices = require("../dao/mongo/services/products.services");
const Service = new ProductServices();


const getProducts = async (req, res) => {
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
}
const getProductsById = async (req, res) => {
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
}
const postProduct = async (req, res) => {
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
}
const postManyProducts = async (req, res) => {
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
}
const delProductById = async (req, res) => {
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
}
const putProductById = async (req, res) => {
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
}
const getProductError = () => {
  res.render("error404", {
    style: "error404.css",
    title: "Error 404",
  });
}
 
module.exports = {
  getProducts,
  getProductsById,
  postProduct,
  postManyProducts,
  delProductById,
  putProductById,
  getProductError
}
