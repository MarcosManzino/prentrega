const express = require("express");
const { isUser, isAdmin } = require("../../middlewares/middleware.auth");

const { Router } = express;
const router = new Router();

router.get('/current', isUser, (req,res)=>{
    const data =req.session.user
    res.send(JSON.stringify(data))
})

module.exports = router