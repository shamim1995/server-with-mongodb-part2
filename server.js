const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const colors = require('colors')
const connectMongoDB = require('./config/db')

//connect appliction from mongoose 
connectMongoDB()

// environment manage

const PORT = process.env.SERVER_PORT

//body get data 
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//routes management
app.use('/api/students', require('./routes/studentRoute'))
app.use('/api/admin', require('./routes/adminRoute'))

app.listen(PORT, () => {
    console.log(`our server is running port ${PORT}`);
})