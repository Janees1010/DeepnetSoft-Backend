const mongoose = require('mongoose')

const menuItemSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    menu:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Menu',
        required:true
    }
})

const MenuItem = mongoose.model('MenuItem',menuItemSchema)

module.exports = MenuItem