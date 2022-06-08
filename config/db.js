const mongoose = require('mongoose')
const dotenv = require('dotenv').config()


//environment manage 

const DB = process.env.MONGO_DB;

// mongoose connect with function 

const connectMongoDB = async()=>{

    try{
        const connect = await mongoose.connect(`${DB}`)
        console.log(`Connection Successfully Done HOST: ${connect.connection.host}`.bgGreen.black);
    }catch(error){
        console.log(`${error}`.bgRed);
    }

  
}


module.exports = connectMongoDB