const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const colors = require('colors')
const connectMongoDB = require('./config/db')
const path = require('path')

const multer = require('multer')

//multer destination for photo
const storage = multer.diskStorage ({
    destination : (req, file, cb) => {
        if(file.fieldname=='photo'){
            cb(null, './media/photos')
        }else if(file.fieldname=='photo2'){
            cb(null, './media/cv')
        }
        
    },
    filename:(req, file, cb) =>{

        if(file.fieldname=='photo'){
              let extName = path.extname(file.originalname)
              let fileName = Date.now() + '-' + Math.round(Math.random() * 1000000) + '' + extName

              cb(null, fileName)
        }else if(file.fieldname=="photo2"){
            const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
           const date = new Date()
           let current_date = month[date.getMonth()]+'-'+date.getDate()+'-'+date.getFullYear()+'-'
            fileName = current_date+''+file.originalname
            cb(null, fileName)
        }

      
    }
    
});

const upload = multer({
    storage: storage,
    limits:(1024*1024),
    fileFilter: (req, file, cb) => {

        if(file.fieldname=="photo"){
            if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/webp') {
                cb(null, true)
            } else {
                cb(alert('File Name Invalid'))
            }
        }else if(file.fieldname=='photo2'){
            if (file.mimetype == 'application/pdf') {
                cb(null, true)
            } else {
                cb(alert('File Name Invalid'))
            }
        }else{
            cb(console.log('check File'))
        }

   
        
    }

 
})


// fields system photo upload 

const cpUpload= upload.fields(
    [
        {
            name:'photo',
            maxCount:10
        },
        {
            name:'photo2',
            maxCount:1
        }
    ]
)

// photo upload with multer

app.post('/upload', cpUpload, (req, res) => {
   
})

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