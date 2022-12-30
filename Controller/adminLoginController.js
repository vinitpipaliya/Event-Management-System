var adminloginflag = { value: false };
const userRegistrationModel = require('../Model/userRegistrationModel')
const eventModel = require('../Model/adminLoginModel')
const vipBookingModel = require('../Model/vipBookingModel')

exports.adminLogin = (req, res) => {
    const data = req.body;
    if (data.name == "admin" && data.password == "admin") {
        adminloginflag.value = true;
        return res.status(200).json({
            message: "Admin Login Successfull."
        })
    }
    return res.status(400).json({
        err: "Username or Password is incorrect."
    })
}


exports.viewRecord = (req, res) => {
    const data = req.body
    userRegistrationModel.find({}, (err, data) => {
        if (err) {
            return res.status(400).json({
                err: "Not Able to Find in Database. " + err
            })
        }
        return res.status(200).send({
            DATA: data
        })
    })
}

exports.updateRecord = (req, res) => {
    const data = req.body;
    userRegistrationModel.findByIdAndUpdate(data._id, data, (err, data) => {
        if (err) {
            return res.status(400).json({
                err: "Not Able to Find in Database. " + err
            })
        }
        else {
            return res.status(200).send({
                message: "Inserted id is Successfully Updated."
            })
        }
    })
}


exports.deleteRecord = (req, res) => {
    const data = req.body;
    userRegistrationModel.findByIdAndRemove(data._id, (err, data) => {

        if (err) {
            return res.status(400).json({
                err: "Not Able to Find in Database. " + err
            })
        }
        return res.status(200).send({
            message: "Inserted id is Successfully Deleted."
        })
    })
}


exports.createEvent = (req, res) => {
    const data = req.body
    const adeveModel = new eventModel(data)
    adeveModel.save((err, data) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to save in database. " + err
            })
        }
        return res.status(200).json({
            message: "Event Created Successfully."
        })
    })
}

exports.viewEvent = (req, res) => {
    const data = req.body
    eventModel.find({}, (err, data) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to find in database. " + err
            })
        }
        return res.status(200).send({
            DATA: data
        })
    })
}

exports.updateEvent = (req, res) => {
    const data = req.body
    eventModel.findByIdAndUpdate(data._id, data, (err, data) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to update in database. " + err
            })
        }
        return res.status(200).send({
            mesage: "Inserted id is successfully updated."
        })
    })
}

exports.deleteEvent = (req, res) => {
    const data = req.body
    eventModel.findOneAndRemove(data._id, (err, data) => {
        if (err) {
            return res.status(400).json({
                err: "Not Able to delete in database. " + err
            })
        }
        return res.status(200).send({
            message: "Inserted id is successfully deleted."
        })
    })
}

exports.vipbooking = (req, res) => {
    try {
        const data = req.body
        const vipMode = new vipBookingModel(data)
        vipMode.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "Not able to save in database. " + err
                })
            }
            else {
                return res.status(200).send({
                    message: "Booking is successsfully completed."
                })
            }
        })
    }
    catch (err) {
        return res.status(400).json({
            Problem: "Problem " + err
        })
    }
}


//Lookup in its own model
exports.fetchData = (req, res) => {
    try {
        const data = req.body
        vipBookingModel.aggregate([
            {
                $lookup: {
                    from: "vipbookings",
                    localField: "_id",
                    foreignField: "user_id",
                    as: "vipBooking"
                }
            },
        ]).exec((err, data) => {
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
    catch (err) {
        return res.status(400).json({
            Problem: "Problem " + err
        })
    }
}

exports.adminloginflag = adminloginflag