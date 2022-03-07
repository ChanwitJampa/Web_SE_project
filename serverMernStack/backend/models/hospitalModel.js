const mongoose = require('mongoose')

const hospitalSchema = mongoose.Schema({
    hospitalName: {
        type: String,
       
    },
    latitude:{
        type: String,
     
    },
    longitude:{
        type: String,
    
    },
    province:{
        type: String,
        
    },
    district:{
        type: String,
    
    }
    ,
    address:{
        type: String,
      
    }
    
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Hospital', hospitalSchema)