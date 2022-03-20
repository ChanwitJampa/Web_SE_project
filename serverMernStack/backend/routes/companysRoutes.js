const express = require('express')
const router = express.Router()
const { getCompanys,setCompany,putCompany,deleteCompany } = require('../controllers/companysController')


router.route('/').get(getCompanys).post(setCompany)
router.route('/:id').put(putCompany).delete(deleteCompany)

module.exports = router