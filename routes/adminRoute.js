const express = require('express')
const router = express.Router()

const {getAllAdminData, createAdminData, getSingleAdminData, updatedAdminData, delteAdminData, profileLogin, homeLogin } = require('../controller/adminControler.js')
const adminLogin = require('../controller/adminLoginControler.js')
const authCheck = require('../middleware/authCheck.js')

router.post('/login', adminLogin)

router.get('/profile', authCheck, profileLogin)
router.get('/home', authCheck, homeLogin)


router.route('/').get(getAllAdminData).post(createAdminData)
router.route('/:id').get(getSingleAdminData).put(updatedAdminData).patch(updatedAdminData).delete(delteAdminData)


module.exports = router