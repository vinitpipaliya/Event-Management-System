const mongoose = require("mongoose")
const adminLoginModel = require("../Model/adminLoginModel")
const userRegistrationModel = require("../Model/userRegistrationModel")
const eventBookingSchema = new mongoose.Schema(
    {
        seat: {
            type: Number,
            trim: true,
            required: true,
            min: 1,
        },
        status: {
            type: Number,
            default: 0
        },
        event_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: adminLoginModel
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: userRegistrationModel
        }
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model("eventBooking", eventBookingSchema)