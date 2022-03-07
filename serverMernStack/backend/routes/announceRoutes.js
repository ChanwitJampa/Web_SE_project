const express = require('express')
const router = express.Router()
const { getAnnounces,setAnnounce,putAnnounce,deleteAnnounce,getAnnounce } = require('../controllers/AnnounceController')


router.route('/').get(getAnnounces).post(setAnnounce)
router.route('/:id').put(putAnnounce).delete(deleteAnnounce).get(getAnnounce)


// router.get('/', getAnnounces)
// router.post('/',postAnnounce)

// router.put('/:id', putAnnounce)
// router.delete('/:id', deleteAnnounce)

module.exports = router