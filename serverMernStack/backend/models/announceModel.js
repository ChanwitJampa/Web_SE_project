const mongoose = require('mongoose')

var announceSchema = mongoose.Schema({
    titleName: {
        type: String,
        required:[true,'Please add a titleName']
       
    },
    detail:{
        type: String,
        required:[true,'Please add a detail']
        
    },
    phoneNumber:{
        type: String,
        default:"null"
        
    },
    email:{
        type: String,
        default:"null"
        
        
    },
    type:{
        type: String,
        required:[true,'Please add a type']
    },
    createtime:{type:String}
},)

announceSchema.pre('save', function(next) {
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

module.exports = mongoose.model('annouces', announceSchema)