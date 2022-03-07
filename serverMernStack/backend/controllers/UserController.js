
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getMaxListeners } = require('../models/userModel');
const { hidden } = require('colors');

//@desc Get users
//@route GET /api/users
//@access Private
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
    res.status(200).json(users)
})



//@desc Set user
//@route POST /api/users
//@access Private
const setUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body


    if (email) {
        const oldUser = await User.findOne({ email })
        if (oldUser) {
            res.status(400)
            throw new Error('email user is aleady use')
        }
    }
    else {
        res.status(400)
        throw new Error(' please add email value')
    }

    encryptedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        idCard: req.body.idCard,
        email: req.body.email,
        password: encryptedPassword,
        hospitalName: req.body.hospitalName,
        hospitalID: req.body.hospitalID,
        role: req.body.role === undefined ? "user" : req.body.role
    })

    //create token
    const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY, {
        expiresIn: "2h"
    }
    )

    //save user token
    user.token = token

    oldUser = await User.findOne({ email })
    res.status(200).json(oldUser)

})




//@desc Update user
//@route PUT /api/users/:id
//@access Private
const putUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(400)
        throw new Error('user id not found')
    }

    const updateduser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updateduser)
})

//@desc Delete user
//@route DELETE /api/users
//@access Private
const deleteUserByGmail = asyncHandler(async (req, res) => {
    const {email} =  req.body
    const user = await User.findOne({email})
    if (!user) {
        res.status(400)
        throw new Error('user not found')
    }
    user.remove()

   
    res.status(200).json({ email:email })
})




//@desc Delete user
//@route DELETE /api/users/:id
//@access Private
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(400)
        throw new Error('user id not found')
    }
    const deleteuser = await User.findByIdAndDelete(req.params.id)
    res.status(200).json({ id: req.params.id })
})



//@desc Get user
//@route GET /api/users/:id
//@access Private
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(400)
        throw new Error('user id not found')
    }
    res.status(200).json(user)
})



module.exports = {
    deleteUserByGmail,
    getUsers,
    setUser,
    putUser,
    deleteUser,
    getUser
}