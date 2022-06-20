const Student = require('../models/studentModel')
const asyncHandler = require('express-async-handler')
//Get All DAta
const getAllDAta = asyncHandler (async(req, res) => {

 const data = await Student.find()
    if(data==''){
        res.status(400).json({
            message: "Data No availble"
        })
    }else{
        res.status(200).json(data)
    }
    
});
//Get Single DAta
const getSingleDAta = asyncHandler (async(req, res) => {
     const id = req.params.id
     
    const hasId = await Student.findById(id)
    if (hasId) {
        const data = await Student.findById(id)
        res.status(200).json(data)
        
    }else{
        res.status(400).json({
            message: `${id} Data Not Found`
        })
    }
   
   
});
// Create DAta
const getCreateDAta = asyncHandler (async(req, res) => {
    const {name,age, skill} = req.body
    
   const data= await Student.create({
     ...req.body
    })
    res.status(200).json({
        message: "Data Created"
    })
});
//Updated DAta
const getUpdatedDAta = asyncHandler( async (req, res) => {

const id = req.params.id

const updata_data = await Student.findByIdAndUpdate(id)
if(!updata_data){
    res.status(400).json({
        message:'Data Not Found'
    })
}else{
const data = await Student.findByIdAndUpdate(id, req.body,{
    new:true
})
res.status(200).json({
    message:'Data Updated'
})
}
});
//Delete DAta
const getDeleteDAta = asyncHandler( async () => {
const id = req.params.id
    await Student.findByIdAndDelete(id)
});


module.exports = {
   getAllDAta,
   getSingleDAta,
   getCreateDAta,
   getUpdatedDAta,
   getDeleteDAta
}