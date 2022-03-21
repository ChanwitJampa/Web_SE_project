const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require("mongoose")
const colors = require('colors')
const axios = require('axios')
const connectDB = require('./backend/config/db')
const auth = require('./backend/middleware/auth')

const multer = require('multer');


connectDB()

const { errorHandler } = require('./backend/middleware/errorMiddleware')

const port = 5000
const app = express()


var cors = require('cors');
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))



app.use('/api/requests', require('./backend/routes/requestsRoutes'))
app.use('/api/companies', require('./backend/routes/companysRoutes'))
app.use('/api/announces', require('./backend/routes/announceRoutes'))
app.use('/api/users', require('./backend/routes/userRouters'))
 app.use('/api/login', require('./backend/routes/loginRouters'))

// app.use('/api/map', require('./backend/routes/mapRoutes'))



// app.post('/api/sayHello', (request, response) => {
//     let a = request.body.a;
//     let b = request.body.b;

//     let c = parseInt(a) + parseInt(b);
//     response.send('Result : '+c);
//     console.log('Result : '+c);
// });


app.use(errorHandler)

app.listen(port, () => console.log('server startedon port', port))