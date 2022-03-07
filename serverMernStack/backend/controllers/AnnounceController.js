
const asyncHandler = require('express-async-handler')
const Announce = require('../models/announceModel')



//@desc Get announces
//@route GET /api/announces
//@access Private
const getAnnounces = asyncHandler(async (req, res) => {

    const announces = await Announce.find()
    res.status(200).json(announces)
})



//@desc Set announce
//@route POST /api/announces
//@access Private
const setAnnounce = asyncHandler(async (req, res) => {
    const announce = await Announce.create({
        hospitalID:req.body.hospitalID,
        hospitalName: req.body.hospitalName,
        vaccinationSite: req.body.vaccinationSite,
        DateStart: req.body.DateStart,
        DateEnd: req.body.DateEnd ===  undefined ?  "null" :req.body.DateEnd ,
        numberPeople: req.body.numberPeople,
        timeSet:req.body.timeSet,
        vaccine: req.body.vaccine,
        registrationType: req.body.registrationType,
        linkRegistration: req.body.linkRegistration ===  undefined ?  "null" : req.body.linkRegistration ,
        image: req.body.image ===  undefined ?  "null" : req.body.image ,
        more: req.body.more ===  undefined ?  "null" : req.body.more
    })
    res.status(200).json(announce)

})




//@desc Update announce
//@route PUT /api/announces/:id
//@access Private
const putAnnounce = asyncHandler(async (req, res) => {
    const announce = await Announce.findById(req.params.id)
    if(!announce){
        res.status(400)
        throw new Error('announce id not found')
    }
   
    const updatedannounce = await Announce.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updatedannounce)
})



//@desc Delete announce
//@route DELETE /api/announces/:id
//@access Private
const deleteAnnounce = asyncHandler(async (req, res) => {
    const announce = await Announce.findById(req.params.id)
    if(!announce){
        res.status(400)
        throw new Error('announce id not found')
    }
    const deleteannounce = await Announce.findByIdAndDelete(req.params.id)
    res.status(200).json({id:req.params.id})
})



//@desc Get announce
//@route GET /api/announces/:id
//@access Private
const getAnnounce = asyncHandler(async(req,res)=>{
    const announce = await Announce.findById(req.params.id)
    if(!announce){
        res.status(400)
        throw new Error('announce id not found')
    }
    res.status(200).json(announce)
})



module.exports = {
    getAnnounces,
    setAnnounce,
    putAnnounce,
    deleteAnnounce,
    getAnnounce
}