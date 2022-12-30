const mongoose = require("mongoose")
const vipBookingSchema = new mongoose.Schema({
    seat: {
        type: Number,
        trim: true,
        required: true,
        min: 1
    },
    status: {
        type: Number,
        default: 0
    },
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userRegistration"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vipbooking",//Foreign key in its own model. Refrence of its own model.
    }
})

module.exports = mongoose.model("vipbooking", vipBookingSchema)