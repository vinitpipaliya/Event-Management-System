const userRegistrationModel = require("../Model/userRegistrationModel")
var userLoginFlag = { value: false }
const eventModel = require('../Model/adminLoginModel')
const bookingModel = require('../Model/bookingModel')
const mongoose = require("mongoose")

exports.userLogin = (req, res) => {
    const data = req.body
    userRegistrationModel.find({ number: data.number }, { password: data.password }, (err, data) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to find in database. " + err
            })
        }
        userLoginFlag.value = true
        return res.status(200).send({
            message: "User login Sucessfull."
        })
    })
}

exports.viewEvent = (req, res) => {
    const data = req.body
    eventModel.find({ status: 0 }, (err, data) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to find in database. " + err
            })
        }
        else {
            return res.status(200).send({
                DATA: data
            })
        }
    })
}

exports.bookEvent = (req, res) => {
    const data = req.body
    const bookmod = new bookingModel(data)
    bookmod.save((err, data) => {
        if (err) {
            return res.status(400).json({
                err: "NOt able to book event. " + err
            })
        }
        else {
            return res.status(200).send({
                message: "Event is successfully booked."
            })
        }
    })

}

exports.updateBooking = (req, res) => {
    const data = req.body
    bookingModel.findByIdAndUpdate(data._id, data, (err, data) => {
        if (err) {
            return res.ststus(400).json({
                err: "Not able to find your booking. " + err
            })
        }
        else {
            return res.status(200).send({
                message: "Your booking is sucessfully updated"
            })
        }
    })
}


exports.cancelBookig = (req, res) => {
    const data = req.body
    bookingModel.findByIdAndUpdate(data._id, data, (err, data) => {
        if (err) {
            return res.ststus(400).json({
                err: "Not able to find your booking. " + err
            })
        }
        else {
            return res.status(200).send({
                message: "Your booking is sucessfully deleted."
            })
        }
    })

}

exports.updateRegistration = (req, res) => {
    const data = req.body
    userRegistrationModel.findOneAndUpdate(data._id, data, (err, data) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                err: "Not able to find in database. " + err
            })
        }
        else {
            return res.status(200).send({
                message: "Your profile is successfully updated."
            })
        }
    })
}

exports.deleteRegistration = (req, res) => {
    const data = req.body
    userRegistrationModel.findByIdAndUpdate(data._id, { status: 1 }, (err, data) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to find in database. " + err
            })
        }
        else {
            return res.status(200).send({
                message: "Your profile is successfully deleted."
            })
        }
    })
}

exports.userLoginFlag = userLoginFlag