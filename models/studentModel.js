const mongoose = require('mongoose')


const modelStudent = mongoose.Schema({
    
    name:String,
    age: Number,
    skill:String
},{
    timestamps:true
})



module.exports= mongoose.model('Student', modelStudent)



