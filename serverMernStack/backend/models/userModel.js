const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please add a firstName']
    },
    lastName:{
        type: String,
        required:[true,'Please add a  lastName']
    },
    idCard:{
        type: String,
        required:[true,'Please add a idCard']
    },
    studentID:{
        type: String,
        required:[true,'Please add a email']
    },
    email:{
        type: String,
        required:[true,'Please add a email']
    },
    password:{
        type: String,
        select: false,
        required:[true,'Please add a assword']
    },
    role:{
        type: String,
        select: false
    },
    token:{
        type:String
    }
    
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('users', userSchema)