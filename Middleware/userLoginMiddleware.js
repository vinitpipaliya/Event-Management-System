const userRegistrationModel = require("../Model/userRegistrationModel")
const { userLoginFlag } = require('../Controller/userLoginController');
const eventModel = require('../Model/adminLoginModel')
const bookingModel = require('../Model/bookingModel')
const jwt = require("jsonwebtoken");

exports.checkUserLogin = (req, res, next) => {
    // const data = req.body
    // if (userLoginFlag.value == true) {
    //     next();
    // }
    // else {
    //     return res.status(400).json({
    //         message: "Please Login Firt."
    //     })
    // }

    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for any page farava");
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        if (decoded.user_id) {
            return next();
        }
        else {
            return res.status(403).send("A token is required for any page farava");
        }
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }


}

exports.checkStatus = (req, res, next) => {
    const data = req.body
    userRegistrationModel.find({ number: data.number }, { password: data.password }, { status: 0 }, (err, abc) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to find in database. " + err
            })
        }
        else {
            next();
        }
    })
}

exports.findEvent = (req, res, next) => {
    const data = req.body
    eventModel.find({ _id: data.event_id }, (err, eventData) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to find in database. " + err
            })
        }
        else {
            req.event = eventData
            next();
        }
    })
}

exports.checkEventStatus = (req, res, next) => {
    const data = req.body
    eventData = req.event
    if (eventData[0].status == 0) {
        req.event = eventData
        next()
    }
    else {
        return res.ststus(400).json({
            err: "Entered event is cancelled. " + err
        })
    }
}

exports.checkEventCapacity = (req, res, next) => {
    const data = req.body
    eventData = req.event
    if (eventData[0].capacity >= data.seat) {
        eventData[0].capacity = eventData[0].capacity - data.seat
        eventModel.findByIdAndUpdate(eventData[0]._id, { capacity: eventData[0].capacity }, (err, eventData) => {
            if (err) {
                return res.status(400).json({
                    err: "Not able to find in database. " + err
                })
            }
            else {
                // req.event = eventData
                next()
            }

        })
    }
    else {
        return res.ststus(400).json({
            err: "Entered event seat is more than event capacity. " + err
        })
    }
}

exports.checkBookingStatus = (req, res, next) => {
    const data = req.body
    bookingModel.find({ _id: data._id }, (err, bookingdata) => {
        if (err) {
            return res.ststus(400).json({
                err: "Your bookig is cancelled. " + err
            })
        }
        else {
            if (bookingdata[0].status == 0) {
                req.bookdt = bookingdata
                next()
            }
            else {
                return res.status(400).json({
                    err: "Your bookig is cancelled. " + err
                })
            }
        }
    })
}

exports.checkBookingSeat = (req, res, next) => {
    const data = req.body
    bookingdata = req.bookdt
    eventModel.find({ _id: bookingdata[0].event_id }, (err, eventData) => {
        if (err) {
            return res.ststus(400).json({
                err: "Not able to find in database. " + err
            })
        }
        else {
            if (eventData[0].capacity >= data.seat) {
                if (bookingdata[0].seat > data.seat) {
                    eventData[0].capacity = eventData[0].capacity + (bookingdata[0].seat - data.seat)
                    req.eved = eventData
                    next()
                }
                else {
                    eventData[0].capacity = eventData[0].capacity - (data.seat - bookingdata[0].seat)
                    req.eved = eventData
                    next()
                }
            }
            else {
                return res.status(400).json({
                    err: "Entered event seat is more than event capacity. " + err
                })
            }
        }
    })
}

exports.changeEveentCapacity = (req, res, next) => {
    const data = req.body
    eventData = req.eved
    eventModel.findByIdAndUpdate(eventData[0]._id, { capacity: eventData[0].capacity }, (err, eventData) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to find in database. " + err
            })
        }
        else {
            // req.event = eventData
            next()
        }

    })
}

exports.changeBookingStatus = (req, res, next) => {
    const data = req.body
    bookingdata = req.bookdt
    bookingModel.findByIdAndUpdate(bookingdata[0]._id, { status: 1 }, (err, data) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to find in db. " + err
            })
        }
        else {
            next()
        }
    })
}

exports.findEventforCancelBooking = (req, res, next) => {
    const data = req.body
    bookingdata = req.bookdt
    eventModel.find({ _id: bookingdata[0].event_id }, { status: 0 }, (err, eventData) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to find in database. " + err
            })
        }
        else {
            req.eved = eventData
            next();
        }
    })
}

exports.changeEventCapacityAfterCancelBooking = (req, res, next) => {
    const data = req.body
    eventData = req.eved
    bookingdata = req.bookdt
    eventData[0].capacity = eventData[0].capacity + bookingdata[0].seat
    eventModel.findByIdAndUpdate(eventData[0]._id, { capacity: eventData[0].capacity }, (err, eventData) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to find in database. " + err
            })
        }
        else {
            // req.event = eventData
            next()
        }

    })
}

exports.checkStatusById = (req, res, next) => {
    const data = req.body
    userRegistrationModel.find({ _id: data._id }, { status: 0 }, (err, data) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to find in database. " + err
            })
        }
        else {
            next();
        }
    })
}
