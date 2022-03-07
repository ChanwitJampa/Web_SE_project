
const asyncHandler = require('express-async-handler')
const version = require('nodemon/lib/version')

const Hospital = require('../models/hospitalModel')

//@desc Get Hospitals
//@route GET /api/hospitals
//@access Private
const getHospitals = asyncHandler(async (req, res) => {
    const hospitals = await Hospital.find()
    res.status(200).json(hospitals)
})

//@desc Set Hospital
//@route POST /api/hospitals
//@access Private
const setHospital = asyncHandler(async (req, res) => {
    // if (!req.body.name) {
    //     res.status(400)
    //     throw new Error('Please add a name field')
    // }
    // if (!req.body.latitude) {
    //     res.status(400)
    //     throw new Error('Please add a latitude field')
    // }
    // if (!req.body.longitude) {
    //     res.status(400)
    //     throw new Error('Please add a longitude field')
    // }
    // if (!req.body.province) {
    //     res.status(400)
    //     throw new Error('Please add a province field')
    // }
    // if (!req.body.district) {
    //     res.status(400)
    //     throw new Error('Please add a district field')
    // }
    // if (!req.body.subDistrict) {
    //     res.status(400)
    //     throw new Error('Please add a subDistrict field')
    // }

    const hospital = await Hospital.create({
        hospitalName: req.body.hospitalName,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        province: req.body.province,
        district: req.body.district,
        address: req.body.address
    })
    res.status(200).json(hospital)

})


//@desc Update Hospital
//@route PUT /api/hospitals/:id
//@access Private
const putHospital = asyncHandler(async (req, res) => {
    const hospital = await Hospital.findById(req.params.id)
    if(!hospital){
        res.status(400)
        throw new Error('hospital id not found')
    }
   
    const updatedHospital = await Hospital.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updatedHospital)
})

//@desc Delete Hospital
//@route DELETE /api/hospitals/:id
//@access Private
const deleteHospital = asyncHandler(async (req, res) => {
    const hospital = await Hospital.findById(req.params.id)
    if(!hospital){
        res.status(400)
        throw new Error('hospital id not found')
    }
    const deleteHospital = await Hospital.findByIdAndDelete(req.params.id)
    res.status(200).json({id:req.params.id})
})


//@desc Get Hospital
//@route GET /api/hospitals/:id
//@access Private
const getHospital = asyncHandler(async(req,res)=>{
    const hospital = await Hospital.findById(req.params.id)
    if(!hospital){
        res.status(400)
        throw new Error('hospital id not found')
    }
    res.status(200).json(hospital)
})


module.exports = {
    getHospitals,
    setHospital,
    putHospital,
    deleteHospital,
    getHospital
}