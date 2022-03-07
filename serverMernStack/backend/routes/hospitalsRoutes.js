const express = require('express')
const router = express.Router()
const { getHospitals,setHospital,putHospital,deleteHospital,getHospital } = require('../controllers/hospitalController')


router.route('/').get(getHospitals).post(setHospital)
router.route('/:id').put(putHospital).delete(deleteHospital).get(getHospital)


// router.get('/', getHospitals)
// router.post('/',postHospital)

// router.put('/:id', putHospital)
// router.delete('/:id', deleteHospital)

module.exports = router