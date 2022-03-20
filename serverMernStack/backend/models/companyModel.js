const mongoose = require('mongoose')

const companySchema = mongoose.Schema({
    companyName: {
        type: String,
       
    },
    businessType:{
        type: String,
        
    },
    address:{
        type: String,
      
    },
    phoneNumber:{
        type: String,
    
    }
    ,
    tel:{
        type: String,
      
    }
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('companies', companySchema)