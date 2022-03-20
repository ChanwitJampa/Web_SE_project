const mongoose = require('mongoose')
const moment = require('moment');

const getDate=()=>{
    
}

var userSchema = mongoose.Schema({
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
        required:[true,'Please add a studentID']
    },
    email:{
        type: String,
        required:[true,'Please add a email']
    },
    password:{
        type: String,
        select: false,
        required:[true,'Please add a password']
    },
    role:{
        type: String,
        select: false,
        default:"student"
    },
    token:{
        type:String
    },
    createtime:{
        type:String
    }
}
)

userSchema.pre('save', function(next) {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const date = dd + '/' + mm + '/' + yyyy;
    this.createtime = date
    next();
  });

module.exports = mongoose.model('users', userSchema)