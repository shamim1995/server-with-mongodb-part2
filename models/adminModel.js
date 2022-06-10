const mongoose = require('mongoose')


const adminModel = mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name is Required']
    },
     email: {
         type: String,
         required: [true, 'Email is Required'],
         unique : true
     },
     password:{
        type:String,
        required:[true, 'Password is Required'],
        unique:true
     },
     username:{
         type : String,
         required: [true, 'Username is required'],
         unique : true,
         lowercase :true,
         minLanght:5,
         maxLangth:10
     },
     location:{
         type:String,
         required:false,
         default:"Dhaka"
     },
     skill:{
         type: String,
         default: 'wordpress'
     }

},{
    timestamps:true
})


module.exports = mongoose.model('Admin', adminModel )