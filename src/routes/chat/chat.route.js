// Creamos Las Rutas
const express = require("express");
const { isUser, isAdmin } = require("../../middlewares/middleware.auth");
const { Router } = express; // Por medio de desestructuracion traemos el constructor de rutas de express

const router = new Router(); //instanciamos un router

router.get("/", isUser, (req, res) => {
  let session = req.session.user
  const data = {
    title: "Chat",
    message: "Ecommerce backend  Index",
    style: "chat.css",
    session:session
  };
  res.render("chat", data);
});

router.get("*", (req, res) => {
  res.render("error404", {
    style: "error404.css",
    title: "Error 404",
  });
});
// Exportamos
module.exports = router;
