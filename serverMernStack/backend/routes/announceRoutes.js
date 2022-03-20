const express = require('express')
const router = express.Router()
const {getannounces,setannounce,deleteannounce,putannounce} = require('../controllers/announcesController')


router.route('/').get(getannounces).post(setannounce)
router.route('/:id').put(putannounce).delete(deleteannounce)

module.exports = router