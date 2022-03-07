const mongoose = require('mongoose')

const provinceSchema = mongoose.Schema({
    provinceName: {
        type: String,
    },
    newcase: {
        type: String,    
    },
    
})

const mapSchema = mongoose.Schema({
    date:{
       type:String
    },
    data: {type:[provinceSchema]},
  

},
)

module.exports = mongoose.model('Map', mapSchema)



