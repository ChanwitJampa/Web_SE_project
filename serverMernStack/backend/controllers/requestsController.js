
const asyncHandler = require('express-async-handler')
const version = require('nodemon/lib/version')
const mongoose = require('mongoose')
const Request = require('../models/requestModel')

//@desc Get requests
//@route GET /api/requests
//@access Private
const getRequests = asyncHandler(async (req, res) => {
    const requests = await Request.find().select('-__v')
    res.status(200).json(requests)
})

//@desc Set request
//@route POST /api/requests
//@access Private
const setRequest = asyncHandler(async (req, res) => {
    const request = await Request.create({
        companyName: req.body.companyName,
        typeRequest: req.body.typeRequest,
        jobTitle: req.body.jobTitle,
        studentID: req.body.studentID,
        assistanceName: req.body.assistanceName,
        address: req.body.address,
        HRName: req.body.HRName,
        HRPhoneNumber: req.body.HRPhoneNumber,
        HREmail: req.body.HREmail,
        dateStart: req.body.dateStart,
        dateEnd: req.body.dateEnd,
        budget: req.body.budget,
        accommodation: req.body.accommodation,
    })
    res.status(200).json(request)

})


//@desc Update request
//@route PUT /api/requests/:id
//@access Private
const putRequest = asyncHandler(async (req, res) => {
    const request = await Request.findById(req.params.id)
    if (!request) {
        res.status(400)
        throw new Error('request id not found')
    }

    const updatedrequest = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedrequest)
})



//@desc Delete request
//@route DELETE /api/requests/:id
//@access Private
const deleteRequest = asyncHandler(async (req, res) => {
    const request = await Request.findById(req.params.id)
    if(!request){
        res.status(400)
        throw new Error('request id not found')
    }
    const deleterequest = await Request.findByIdAndDelete(req.params.id)
    res.status(200).json({id:req.params.id})
})

//@desc Get request
//@route GET /api/requests/:id
//@access Private
const getRequest = asyncHandler(async (req, res) => {
    var   request
    if( mongoose.Types.ObjectId.isValid(req.params.id) ) {
        request = await Request.findById(req.params.id)
    }
   
  if(!request){
      request = await Request.findOne({'studentID':req.params.id})
  }
   if (request) {
       res.status(200).json(request)
   }
   else{
       res.status(404)
   }
})
module.exports = {
    getRequests,
    putRequest,
    setRequest,
    deleteRequest,
    getRequest,
}