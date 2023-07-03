const express = require('express')
const UserServices = require('../services/users.services')

const Service = new UserServices()

const {Router} = express
const router = new Router()

router.get('/register', (req,res)=>{
    res.status(200).render('register',{
        style: 'register.css',
        title:'Register'
    })
})
router.get('/login', (req,res)=>{
    res.status(200).render('login',{
        style: 'login.css',
        title:'Login'
    })
})
router.post('/login', async (req,res)=>{
    let {email,password}= req.body
    try{
        let users= await Service.getAll()
        let userFound= users.find(user=>{
           return user.email == email && user.password == password
        } )
        if(userFound){
            console.log('Usuario Encontrado', userFound)
            req.session.userEmail= email
            req.session.userPassword= password
            res.redirect('/session/profile')
        }
        else{
            console.log('Usuario no encontrado')
        }

    }
    catch{
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
        }
    
})
router.get('/profile', (req,res)=>{
   res.render('profile',{
    style:'profile.css',
    title:'Profile'
   })
})
router.get('/logout', (req,res)=>{
    req.session.destroy(err=>{
        if(err) res.send('Failed Logout')
        res.redirect('/session/register')
    })
})



module.exports = router