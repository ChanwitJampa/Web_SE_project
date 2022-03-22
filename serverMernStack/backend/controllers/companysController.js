
const asyncHandler = require('express-async-handler')
const version = require('nodemon/lib/version')
const mongoose = require('mongoose')
const Company = require('../models/companyModel')

//@desc Get Companys
//@route GET /api/Companys
//@access Private
const getCompanys = asyncHandler(async (req, res) => {
    const companys = await Company.find().select('-__v')
    res.status(200).json(companys)
})

//@desc Set Company
//@route POST /api/Companys
//@access Private
const setCompany = asyncHandler(async (req, res) => {
    if(!req.body.companyName){
        res.status(400)
        throw new Error('ใส่ companyName ด้วย')
    }
    if(!req.body.businessType){
        res.status(400)
        throw new Error('ใส่ businessType ด้วย')
    }
    if(!req.body.address){
        res.status(400)
        throw new Error('ใส่ address ด้วย')
    }
    if(!req.body.phoneNumber){
        res.status(400)
        throw new Error('ใส่ phoneNumber ด้วย')
    }
    if(!req.body.tel){
        res.status(400)
        throw new Error('ใส่ tel ด้วย')
    }
    const company = await Company.create({
        companyName: req.body.companyName,
        businessType: req.body.businessType,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        tel: req.body.tel
    })
    res.status(200).json(company)

})


//@desc Update company
//@route PUT /api/companys/:id
//@access Private
const putCompany = asyncHandler(async (req, res) => {
    const company = await Company.findById(req.params.id)
    if (!company) {
        res.status(400)
        throw new Error('user id not found')
    }

    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedCompany)
})



//@desc Delete Company
//@route DELETE /api/Companys/:id
//@access Private
const deleteCompany = asyncHandler(async (req, res) => {
    const company = await Company.findById(req.params.id)
    if(!company){
        res.status(400)
        throw new Error('Company id not found')
    }
    const deleteCompany = await Company.findByIdAndDelete(req.params.id)
    res.status(200).json({id:req.params.id})
})


//@desc getCompany
//@route get /api/Companys/:id
//@access Private
const getCompany = asyncHandler(async (req, res) => {
    var company
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        company = await Company.findById(req.params.id)
    }
    else {
        res.status(400)
        throw new Error('ใส่ object id มาผิด')
    }

    if (company) {
        res.status(200).json(company)
    }
    else {
        res.status(400)
        throw new Error(' เอา object id ไปหาแล้ว หาไม่เจออะ พยายามละ โทษหวะ')
    }
})
module.exports = {
    getCompanys,
    putCompany,
    setCompany,
    deleteCompany,
    getCompany
}