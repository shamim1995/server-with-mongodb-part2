const Admin = require('../models/adminModel')
const bcrypt = require('bcryptjs')

const adminLogin = async (req, res)=>{
    const {email, password} = req.body
    const admin_data = await Admin.findOne({email})

    if(!admin_data){
        res.status(400).json({
            message:"Email invalid"
        })
    }else{
        if(await (bcrypt.compare(password, admin_data.password))) {
             res.status(200).json({
                 message: 'Admin Login Successfull'
             })

        } else {
            res.status(400).json({
                message: 'Password wrong'
            })
        }
        
    }

}


module.exports = adminLogin