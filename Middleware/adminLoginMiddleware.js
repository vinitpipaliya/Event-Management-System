const { adminloginflag } = require('../Controller/adminLoginController')
const userRegistrationModel = require('../Model/userRegistrationModel')
const eventModel = require('../Model/adminLoginModel')


exports.checkAdminLogin = (req, res, next) => {
    const data = req.body
    if (adminloginflag.value == true) {
        next();
    }
    else {
        return res.status(400).json({
            message: "Pehla Login KAro."
        })
    }
}

exports.checkUserDatabase = (req, res, next) => {
    const data = req.body
    userRegistrationModel.find({}, (err, data) => {
        if (userRegistrationModel.data == null) {
            return res.status(400).json({
                err: "Database is Empty. "
            })
        }
        else {
            next();
        }
    })
}

exports.checkEventDatabase = (req, res, next) => {
    const data = req.body
    res.json({
        data: eventModel.data
    })
    eventModel.find({}, (err, data) => {
        if (eventModel.data == null) {
            return res.status(400).json({
                err: "Database is empty."
            })
        }
        else {
            next();
        }
    })
}