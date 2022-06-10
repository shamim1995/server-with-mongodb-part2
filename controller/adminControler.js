const bcrypt = require('bcryptjs')
const Admin = require('../models/adminModel')

// Get all admin data 

const getAllAdminData = async (req, res) =>{
 const data = await Admin.find()   
res.status(200).json(data)
};
// Get single admin data 
const getSingleAdminData = async (req, res) => {

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
   


};
// create admin data 
const createAdminData = async (req, res) => {
 const {name, email, username, password, location, skill } = req.body

 const salt = await bcrypt.genSalt(10)
 const hash = await bcrypt.hash(password, salt)

if(!name || !email || !username || !password ){
    res.status(400).json({
        message: "All Fields Required"
    })
}else{
 const data = await Admin.create({
     ...req.body,
     password: hash
 })
 res.status(200).json({
     message: 'Data Created'
 })

}
   
};
// update admin data 
const updatedAdminData = async (req, res) => {

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


};
// Get single admin data 
const delteAdminData = async (req, res) => {
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
};


module.exports = {
    getAllAdminData,
    getSingleAdminData,
    createAdminData,
    updatedAdminData,
    delteAdminData
}