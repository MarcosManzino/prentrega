const getApiSession = (req,res)=>{
    const data = req.session.user
    res.send(JSON.stringify(data))
}

module.exports = getApiSession

// router.get('/current', isUser, (req,res)=>{
//     const data =req.session.user
//     res.send(JSON.stringify(data))
// })
