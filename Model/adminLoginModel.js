const mongoose = require('mongoose')
const eventSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 50,
        },
        capacity: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 4,
        },
        address: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100,
        },
        date: {
            type: String,
            trim: true,
            required: true,
            maxlength: 10,
        },
        fees: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 10,
        },
        status: {
            type: Number,
            default: 0
        },
        creator: {
            type: String,
            default: "Admin"
        }
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model("eventAdd", eventSchema)