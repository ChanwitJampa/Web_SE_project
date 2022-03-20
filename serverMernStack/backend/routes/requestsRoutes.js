const express = require('express')
const router = express.Router()
const { getRequests,setRequest,putRequest,deleteRequest,getRequest} = require('../controllers/requestsController')


router.route('/').get(getRequests).post(setRequest)
router.route('/:id').put(putRequest).delete(deleteRequest).get(getRequest)


// router.get('/', gets)
// router.post('/',post)

// router.put('/:id', put)
// router.delete('/:id', delete)

module.exports = router