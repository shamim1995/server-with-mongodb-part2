const Admin = require('../models/adminModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken') 

const adminLogin = async (req, res)=>{
    const {email, password} = req.body
    const admin_data = await Admin.findOne({email})

    if(!admin_data){
        res.status(400).json({
            message:"Email invalid"
        })
    }else{
        if(await (bcrypt.compare(password, admin_data.password))) {
              const { name, email, username, id }= admin_data 
            
              const token = jwt.sign({id:id}, process.env.TOKEN_SECRET,{
                  expiresIn:'1d'
              })

          
             res.status(200).json({
                 name:name,
                 email:email,
                 username:username,
                 id:id,
                 token: token

             })

        } else {
            res.status(400).json({
                message: 'Password wrong'
            })
        }
        
    }

}


module.exports = adminLogin