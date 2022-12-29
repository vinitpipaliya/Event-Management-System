const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const userRegistrationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 50,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            maxlength: 50,
            unique: true,
        },
        number: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 10,
            unique: true,
        },
        password: {
            type: String,
            trim: true,
            required: true,
            maxlength: 16,
        },
        salt: String,
        dob: {
            type: String,
            trim: true,
            required: true,
            maxlength: 10,
        },
        status: {
            type: Number,
            default: 0
        },
        InvestedMoney: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

userRegistrationSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

userRegistrationSchema.pre('findOneAndUpdate', function (next) {
    this._update.password = bcrypt.hashSync(this._update.password, 10)
    next();
})

userRegistrationSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model("userRegistration", userRegistrationSchema)