const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    code:{
        type:String,
        unique:true,
        required:true,

    },
    purchase_datetime:{
        type:String,
        unique:false,
        required:true,
    },
    amount:{
        type:Number, 
        unique:false,
        required:true,
    },
    purchaser:{
        type:String,
        unique:false,
        required:true,
    }
})

const Ticket = mongoose.model('ticket', ticketSchema)

module.exports= Ticket