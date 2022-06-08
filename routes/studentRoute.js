const express = require('express')
const router = express.Router()

const {getAllDAta, getSingleDAta, getCreateDAta, getUpdatedDAta, getDeleteDAta} = require('../controller/studentControler')


router.route('/').get(getAllDAta).post(getCreateDAta)
router.route('/:id').get(getSingleDAta).put(getUpdatedDAta).patch(getUpdatedDAta).delete(getDeleteDAta)



module.exports = router;