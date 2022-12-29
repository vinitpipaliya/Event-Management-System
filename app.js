const express = require("express")
const bp = require("body-parser")
const mongoose = require("mongoose")
require('dotenv').config()
const cookieParser = require('cookie-parser')

var app = express();

mongoose.connect(process.env.URL, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log('DB CONNECT')
}).catch((err) => {
    console.log('ERROR IN CONNECT ' + err)
})

app.use(bp.json())
app.use(cookieParser())

const UserRegistration = require('./Routing/userRegistrationRouting')
const AdminLogin = require('./Routing/adminLoginRouting')
const UserLogin = require('./Routing/userLoginRouting')
const login = require('./Routing/login')

app.use('/userRegistration', UserRegistration)
app.use('/login', login)
app.use('/adminLogin', AdminLogin)
app.use('/userLogin', UserLogin)

app.listen(process.env.PORT, () => {
    console.log("SERVER START")
})