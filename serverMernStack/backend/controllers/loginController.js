
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getMaxListeners, findOne } = require('../models/userModel');
const { hidden } = require('colors');


//@desc login
//@route POST /api/login
//@access Private
const login = asyncHandler(async (req, res) => {



    const { email, password } = req.body

    //validate user input
    if (!(email && password)) {
        res.status(400)
        throw new Error('email or password are  required')
    }

    const user = await User.findOne({ email }).select('+password')

    if (user) {
        if ((await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY, {
                expiresIn: "24h"
            })
            //save token in uuser
            const oldUser = await User.findOne({ email },'-createdAt -updatedAt -__v')
            //if want to deselect _id await User.findOne({ email }, '-_id')
            oldUser.token = token
            res.status(200).json(oldUser)
        }

    }
    else {
        res.status(400)
        throw new Error('wrong userName')

    }
    res.status(400)
    throw new Error('wrong password')


})








module.exports = {
    login
}