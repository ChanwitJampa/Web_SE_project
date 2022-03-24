
const asyncHandler = require('express-async-handler')
const version = require('nodemon/lib/version')
const mongoose = require('mongoose')
const Request = require('../models/requestModel')

const User = require('../models/userModel')
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
    if (!req.body.companyName) {
        res.status(400)
        throw new Error('ใส่ companyName ด้วย')
    }
    if (!req.body.typeRequest) {
        res.status(400)
        throw new Error('ใส่ typeRequest ด้วย')
    }
    if (!req.body.jobTitle) {
        res.status(400)
        throw new Error('ใส่ jobTitle ด้วย')
    }
    if (!req.body.studentID) {
        res.status(400)
        throw new Error('ใส่ studentID ด้วย')
    }
    if (!req.body.assistanceName) {
        res.status(400)
        throw new Error('ใส่ assistanceName ด้วย')
    }
    if (!req.body.assistanceRole) {
        res.status(400)
        throw new Error('ใส่ assistanceRole ด้วย')
    }
    if (!req.body.address) {
        res.status(400)
        throw new Error('ใส่ address ด้วย')
    }
    if (!req.body.HRName) {
        res.status(400)
        throw new Error('ใส่ HRName ด้วย')
    }
    if (!req.body.HRPhoneNumber) {
        res.status(400)
        throw new Error('ใส่ HRPhoneNumber ด้วย')
    }
    if (!req.body.HREmail) {
        res.status(400)
        throw new Error('ใส่ HREmail ด้วย')
    }
    if (!req.body.dateStart) {
        res.status(400)
        throw new Error('ใส่ dateStart ด้วย')
    }
    if (!req.body.dateEnd) {
        res.status(400)
        throw new Error('ใส่ dateEnd ด้วย')
    }
    if (!req.body.budget) {
        res.status(400)
        throw new Error('ใส่ budget ด้วย')
    }
    if (!req.body.accommodation) {
        res.status(400)
        throw new Error('ใส่ accommodation ด้วย')
    }
    


    var user
    if (mongoose.Types.ObjectId.isValid(req.body.studentID)) {
        user = await User.find({ '_id': req.body.studentID })
    }

   else {
        user = await User.find({ 'studentID': req.body.studentID })
    }


    if (user.length == 0) {
        res.status(401)
        throw new Error('อย่าใส่ studentID มั่วมา หาไม่เจอเหวย')
    }


    const request = await Request.create({
        companyName: req.body.companyName,
        typeRequest: req.body.typeRequest,
        jobTitle: req.body.jobTitle,
        studentID: req.body.studentID,
        assistanceName: req.body.assistanceName,
        assistanceRole: req.body.assistanceRole,
        address: req.body.address,
        HRName: req.body.HRName,
        HRPhoneNumber: req.body.HRPhoneNumber,
        HREmail: req.body.HREmail,
        dateStart: req.body.dateStart,
        dateEnd: req.body.dateEnd,
        budget: req.body.budget,
        status: req.body.status,
        accommodation: req.body.accommodation,
        detail: ""
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
    if (!request) {
        res.status(400)
        throw new Error('request id not found')
    }
    const deleterequest = await Request.findByIdAndDelete(req.params.id)
    res.status(200).json({ id: req.params.id })
})

//@desc Get request
//@route GET /api/requests/:id
//@access Private
const getRequest = asyncHandler(async (req, res) => {
    var request
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        request = await Request.findById(req.params.id)
    }

    if (!request) {
        request = await Request.find({ 'studentID': req.params.id })
        // request = await Request.findOne({'studentID':req.params.id})
    }
    if (request) {
        res.status(200).json(request)
    }
    else {
        res.status(404)
        throw new Error("หาไม่เจอ")
    }
})
module.exports = {
    getRequests,
    putRequest,
    setRequest,
    deleteRequest,
    getRequest,
}