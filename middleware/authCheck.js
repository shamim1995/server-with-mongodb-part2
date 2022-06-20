const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

const authCheck = async (req,res, next)=>{



if (req.headers.authorization){

    try{
        //get token
        const token = req.headers.authorization.split(' ')[1];
        //token verify
        const {id} = jwt.verify(token, process.env.TOKEN_SECRET)
        //get login user id 

       req.user = await Admin.findById(id);
      
        next()
    }catch(error){
        console.log(error);
    }

   

}else{
    res.status(400).json({
        message:'Token Not Found'
    })
}


}

module.exports = authCheck