
const asyncHandler = require('express-async-handler')
const version = require('nodemon/lib/version')

const Announce = require('../models/announceModel')

//@desc Get announces
//@route GET /api/announces
//@access Private
const getannounces = asyncHandler(async (req, res) => {
    const announces = await Announce.find()
    res.status(200).json(announces)
})

//@desc Set announce
//@route POST /api/announces
//@access Private
const setannounce = asyncHandler(async (req, res) => {
    const announce = await Announce.create({
        titleName: req.body.titleName,
        detail: req.body.detail
     
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
        throw new Error('user id not found')
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

module.exports = {
    getannounces,
    putannounce,
    setannounce,
    deleteannounce,
}