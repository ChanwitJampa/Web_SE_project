const express = require('express')
const router = express.Router()
const { getCompanys,setCompany,putCompany,deleteCompany,getCompany } = require('../controllers/companysController')


router.route('/').get(getCompanys).post(setCompany)
router.route('/:id').put(putCompany).delete(deleteCompany).get(getCompany)

module.exports = router