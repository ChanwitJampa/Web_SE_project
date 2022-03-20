const mongoose = require('mongoose')

const announceSchema = mongoose.Schema({
    titleName: {
        type: String,
       
    },
    detail:{
        type: String,
        
    }
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('annouces', announceSchema)