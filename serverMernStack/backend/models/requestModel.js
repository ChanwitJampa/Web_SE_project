const mongoose = require('mongoose')




var requestSchema = mongoose.Schema({
    companyName: {
        type: String,
        required: [true, 'Please add a companyName']
    },
    typeRequest:{
        type: String,
        required:[true,'Please add a  typeRequest']
    },
    studentID:{
        type: String,
        ref:"users",
        required:[true,'Please add a ID student']
    },
    jobTitle:{
        type: String,
        required:[true,'Please add a jobTitle']
    },
    assistanceName:{
        type: String,
        required:[true,'Please add a assistanceName']
    },
    assistanceRole:{
        type: String,
        required:[true,'Please add a assistanceName']
    },
    address:{
        type: String,
        required:[true,'Please add a address']
    },
    HRName:{
        type: String,
        required:[true,'Please add a HRName']
    },
    HRPhoneNumber:{
        type: String,
        required:[true,'Please add a HRPhoneNumber']
    },
    HREmail:{
        type: String,
        required:[true,'Please add a HREmail']
    },
    dateStart:{
        type: String,
        required:[true,'Please add a dateStart']
    },
    dateEnd:{
        type: String,
        required:[true,'Please add a dateEnd']
    },
    budget:{
        type: String,
        required:[true,'Please add a budget']
    },
    accommodation:{
        type: String,
        required:[true,'Please add a accommodation']
    },
     status:{
        type: String,  
        default:"รอการอนุมัติ"
    },
    detail:{
        type: String,
        default: ""
    },
    createtime:{
        type:String
    }
}
)

requestSchema.pre('save', function(next) {
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

module.exports = mongoose.model('requests', requestSchema)