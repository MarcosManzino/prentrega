const express = require('express')
const user = require('../../dao/models/users.model')
const userService= require ('../services/users.services')

const Service = new userService()
const {Router}= express
const route = new Router()

route.post('/', async (req,res) => {
    let data= res.body
    try{
        await Service.createOne(data)
        return res.status(200).json({
            status: 'success', 
            msg: 'User created',
            data: data,
          })
    }
    catch (e) {
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }

} )