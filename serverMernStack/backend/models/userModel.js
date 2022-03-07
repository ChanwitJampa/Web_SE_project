const mongoose = require('mongoose')

const hospitalSchema = mongoose.Schema({
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
    email:{
        type: String,
        required:[true,'Please add a email']
    },
    password:{
        type: String,
        select: false,
        required:[true,'Please add a assword']
    },
    hospitalName:{
        type: String,
        required:[true,'Please add a hospitalName']
    },
    hospitalID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Hospital",
        required:[true,'Please add a hospital ID']
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

module.exports = mongoose.model('User', hospitalSchema)