const mongoose = require('mongoose')

var companySchema = mongoose.Schema({
    companyName: {
        type: String,
        required:[true,'Please add a companyName']
       
    },
    businessType:{
        type: String,
        required:[true,'Please add a businessType']
        
    },
    address:{
        type: String,
        required:[true,'Please add a address']
      
    },
    phoneNumber:{
        type: String,
        default:"null"
    
    },
    tel:{
        type: String,
        default:"null"
      
    },
    createtime:{
        type:String
    }
},)

companySchema.pre('save', function(next) {
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

module.exports = mongoose.model('companies', companySchema)