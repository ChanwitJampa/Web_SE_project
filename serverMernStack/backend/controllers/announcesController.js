
const asyncHandler = require('express-async-handler')
const version = require('nodemon/lib/version')
const mongoose = require('mongoose')
const Announce = require('../models/announceModel')

//@desc Get announces
//@route GET /api/announces
//@access Private
const getannounces = asyncHandler(async (req, res) => {
    const announces = await Announce.find().select('-__v')
    res.status(200).json(announces)
})

//@desc Set announce
//@route POST /api/announces
//@access Private
const setannounce = asyncHandler(async (req, res) => {
    if(!req.body.titleName){
        res.status(400)
        throw new Error('ใส่ titleName ด้วย')
    }
    if(!req.body.detail){
        res.status(400)
        throw new Error('ใส่ detail ด้วย')
    }
    if(!req.body.phoneNumber){
        res.status(400)
        throw new Error('ใส่ phoneNumber ด้วย')
    }
    if(!req.body.email){
        res.status(400)
        throw new Error('ใส่ email ด้วย')
    }
    if(!req.body.type){
        res.status(400)
        throw new Error('ใส่ type ด้วย')
    }
    const announce = await Announce.create({
        titleName: req.body.titleName,
        detail: req.body.detail,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        type: req.body.type

     
    })
    res.status(200).json(announce)

})


//@desc Update announce
//@route PUT /api/announces/:id
//@access Private
const putannounce = asyncHandler(async (req, res) => {
    const announce = await Announce.findById(req.params.id)
    if (!announce) {
        res.status(400)
        throw new Error('annouce id not found')
    }

    const updatedannounce = await Announce.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedannounce)
})



//@desc Delete announce
//@route DELETE /api/announces/:id
//@access Private
const deleteannounce = asyncHandler(async (req, res) => {
    const announce = await Announce.findById(req.params.id)
    if(!announce){
        res.status(400)
        throw new Error('announce id not found')
    }
    const deleteannounce = await Announce.findByIdAndDelete(req.params.id)
    res.status(200).json({id:req.params.id})
})

//@desc Delete announce
//@route DELETE /api/announces/:id
//@access Private
const getannounce = asyncHandler(async (req, res) => {
    var request
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        request = await Announce.findById(req.params.id)
    }
    else {
        res.status(400)
        throw new Error('ใส่ object id มาผิด')
    }

    if (request) {
        res.status(200).json(request)
    }
    else {
        res.status(400)
        throw new Error(' เอา object id ไปหาแล้ว หาไม่เจออะ พยายามละ โทษหวะ')
    }
})
module.exports = {
    getannounces,
    putannounce,
    setannounce,
    deleteannounce,
    getannounce
}