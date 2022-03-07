const mongoose = require('mongoose')

const vaccineSchema = mongoose.Schema({
    numberVaccine: {
        type: String,
        required: [true, 'Please add a Number of vaccine']
    },
    ageRange: {
        type: String,
        required: [true, 'Please add age range vaccine']
    },
    vaccineType: {
        type: String,
        required: [true, 'Please add age vaccine type']
    }
})

const announceSchema = mongoose.Schema({
    hospitalID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Hospital",
        required:[true,'Please add a hospital ID']

    },
    hospitalName: {
        type: String,
        required: [true, 'Please add a hospitalName']
    },
    vaccinationSite: {
        type: String,
        required: [true, 'Please add a vaccinationSite']
    },
    DateStart: {
        type: String,
        required: [true, 'Please add a DateStart']
    },
    DateEnd: {
        type: String,
    },
    numberPeople: {
        type: String,
        required: [true, 'Please add a numberPeople']
    },
    timeSet: {
        type: [String],
        required: [true, 'Please add a TimeSet']
    },
    vaccine: {type:[vaccineSchema]},
    registrationType: {
        type: String,
        required: [true, 'Please add a resgistration type']
    },
    linkRegistration: String,
    image: String
    // {
    //     data: Buffer,
    //     contentType: String
    // }
    ,
    more: String

},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Announce', announceSchema)



//ตัวอย่างการส่งข้อมูล
/*
{
    "hospitalName":"โรงพยาบาลกำแพงแสน",
    "vaccinationSite":"อาคาร 1",
    "DateStart":"12:00",
    "DateEnd":"13:00",
    "numberPeople":"1",
    "vaccine":[
        {
            "numberVaccine":"1",
            "ageRange":"18-40",
            "vaccineType":"moderna"
        },
            {
            "numberVaccine":"2",
            "ageRange":"18-40",
            "vaccineType":"Pfizer"
        }
    ]
    ,
    "registrationType":"walkin",
    "linkRegistration":"testtest.com",
    "image":"test.png",
    "timeSet":["9:00","13:00","15:00"],
    "more":"ต้องการบัตรประชาชน"
}

*/