
const asyncHandler = require('express-async-handler')
const version = require('nodemon/lib/version')
const axios = require('axios')

const Map = require('../models/mapModel')
const {objects} = require('./data/thailand.json')
const { off } = require('../models/mapModel')

//@desc Get Hospital
//@route GET /api/hospitals/:id
//@access Private
const newTotalCase = asyncHandler(async(req,res)=>{
    if(!req.params.provinceName){
        res.status(400).send("give me province name")
        return;
       // throw new Error('give me a provinceName')
    }
    var data =[{
        new_total_1:"",
        new_total_7:"",
        new_total_30:"",
        death_total_1:"",
        death_total_7:"",
        death_total_30:"",
        traveler_total_1:"",
        traveler_total_7:"",
        traveler_total_30:""
    }]
     var check =0
     var count = 0;
     var new_total=0
     var death_total=0
     var traveler_total=0

    const maxfindWithOutFound = 100

     var j=1
    var name=req.params.provinceName
    await axios.get(`https://covid19.ddc.moph.go.th/api/Cases/timeline-cases-by-provinces`).then((response) => {
             var lengthData =  response.data.length
            for(var i=0;i< lengthData ;i=i+j){
                console.log(i+" || "+ count)
                if(i>maxfindWithOutFound && check===0 ){
                    break
                }
                if(count>30){
                    console.log("break")
                    break;
                   
                }

                if(response.data[lengthData-1-i].province===name)
                {

                    check=1
                    j=78

                    count=count+1
                    new_total=response.data[lengthData-1-i].new_case + new_total
                    death_total=response.data[lengthData-1-i].new_death + death_total
                    traveler_total=response.data[lengthData-1-i].new_case_excludeabroad + traveler_total

                    if(count==1){
                        data[0].new_total_1 = new_total
                        data[0].death_total_1 = death_total
                        data[0].traveler_total_1 = new_total - traveler_total
                    }
                    else if(count==7){
                        data[0].new_total_7 = new_total
                        data[0].death_total_7 = death_total
                        data[0].traveler_total_7 = new_total - traveler_total
                    }
                    else if(count==30){
                        data[0].new_total_30 = new_total
                        data[0].death_total_30 = death_total
                        data[0].traveler_total_30 = new_total - traveler_total
                    }

                }
            }
        })
        if(check==0){
            res.status(400).send(`not have this province name ${req.params.provinceName}`)
            return;
           // throw new Error(`Not have this province name ${req.params.provinceName}`)
        }else if(check==1){
            res.status(200).json(data)
            return;
        }
})

const getDataAllProvince = asyncHandler(async (req, res) => {
    let date = new Date()

    //หาว่าใน data base มีวันนี้ยัง
     const map = await Map.findOne({date:`${date.getDate()}`})

    //console.log(objects.province.geometries)
    var provinceData=[];


        //ถ้าไม่มีก็สร้าง
     if(!map) {
        await axios.get(`https://covid19.ddc.moph.go.th/api/Cases/timeline-cases-by-provinces`).then((response) => {
                
                var x = response.data.length
  
                 var data =  response.data.slice(
                x-79,
                x-1
              )
            var lengthData =  data.length
            var lenghtObjects = objects.province.geometries.length
            console.log(`${lengthData}  ----  ${lenghtObjects}`)
            for(var j=0 ; j < lenghtObjects ; j=j+1){
                 for(var i=0 ; i < lengthData ; i=i+1){
                    //console.log(`${data[i].province} +++ ${objects.province.geometries[j].properties.NAME_1}`)

                    if(data[i].province === objects.province.geometries[j].properties.NAME_1){
                        provinceData.push({
                            provinceName:objects.province.geometries[j].properties.NAME_1,
                            newcase:data[i].new_case
                        })
                        break;
                    }
                    else if(i==77){
                        provinceData.push({
                            provinceName:objects.province.geometries[j].properties.NAME_1,
                            newcase:0
                        })
                    }
                }
            }
        })
        const newMapDate = await Map.create({
            date:`${date.getDate()}`,
            data: provinceData
        })
        res.status(200).json(newMapDate)
            return;
    }
    else{
        res.status(200).json(map)
    }

    res.status(400)
    
})


module.exports = {
    newTotalCase,
    getDataAllProvince
}