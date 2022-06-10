const express = require('express')
const router = express.Router()

const {getAllAdminData, createAdminData, getSingleAdminData, updatedAdminData, delteAdminData } = require('../controller/adminControler.js')
const adminLogin = require('../controller/adminLoginControler.js')


router.route('/').get(getAllAdminData).post(createAdminData)
router.route('/:id').get(getSingleAdminData).put(updatedAdminData).patch(updatedAdminData).delete(delteAdminData)
router.post('/login', adminLogin )
module.exports = router