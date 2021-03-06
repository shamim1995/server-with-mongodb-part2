const bcrypt = require('bcryptjs')
const Admin = require('../models/adminModel')
const asyncHandler = require('express-async-handler')

// Get all admin data 

const getAllAdminData = asyncHandler( async (req, res) => {
 const data = await Admin.find()   
res.status(200).json(data)
});
// Get single admin data 
const getSingleAdminData = asyncHandler( async (req, res) => {

    const id = req.params.id
    const singleId = await Admin.findById(id)
if(singleId){
    const data = singleId
    res.status(200).json(data)
   
}else{
  res.status(400).json({
      message: "Data Not Found"
  })
}
   


});
// create admin data 
const createAdminData = asyncHandler( async (req, res) => {
 const {name, email, username, password, location, skill } = req.body

 const salt = await bcrypt.genSalt(10)
 const hash = await bcrypt.hash(password, salt)

if(!name || !email || !username || !password ){
    res.status(400).json({
        message: "All Fields Required"
    })
}else{
 await Admin.create({
     ...req.body,
     password: hash
 })
 res.status(200).json({
     message: 'Data Created'
 })

}
   
});
// update admin data 
const updatedAdminData = asyncHandler (async(req, res) => {

    const id = req.params.id
    const singleId = await Admin.findById(id)
    if (singleId){
        const data = await Admin.findByIdAndUpdate(id,req.body)
       res.status(200).json(data)
    }else{
        res.status(400).json({
            message:"Data No Availble"
        })
    }


});
// Get single admin data 
const delteAdminData = asyncHandler( async(req, res) => {
     const id = req.params.id
     const singleId = await Admin.findById(id)
    if(singleId){
        const data = await Admin.findByIdAndDelete(id)
        res.status(200).json({
            message: 'Admin Data Deleted Successful'
        })
    }else{
        res.status(400).json({
            message: "Admin Data Not Found"
        })
    }
});

//Admin profile login

const profileLogin = (req,res) => {
res.json(req.user)
}
//Admin home login

const homeLogin = (req, res) => {
    res.json(req.user)
}


module.exports = {
    getAllAdminData,
    getSingleAdminData,
    createAdminData,
    updatedAdminData,
    delteAdminData,
    profileLogin,
    homeLogin
}