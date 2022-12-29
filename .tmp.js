//how to get id from database??
var user = db.users.findOne({ userName: "And" })
var Id = user._id   //--> ERROR IN RUNTIME

//how to encrypt password in database??
const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
const crypto = require("crypto");
const uuidv1 = require("uuid");
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 50
        },
        email: {
            type: String,
            required: true,
            maxlength: 50,
            unique: true
        },
        password: {
            type: String,
            required: true,
            maxlength: 50,
        },
        salt: String,
        birthdate: {
            type: Date,
            required: true
        },
        status: {
            type: Boolean,
            required: true
        }
    },
    { timestamps: true }
);

// userSchema.pre('save', function (next) {
//     var user = this;

//     // only hash the password if it has been modified (or is new)
//     if (!user.isModified('password')) return next();

//     // generate a salt
//     bcrypt.genSalt(10, function (err, salt) {
//         if (err) return next(err);

//         // hash the password using our new salt
//         bcrypt.hash(user.password, salt, function (err, hash) {
//             if (err) return next(err);
//             // override the cleartext password with the hashed one
//             user.password = hash;
//             next();
//         });
//     });
// });
// userSchema.methods.comparePassword = function (candidatePassword, cb) {
//     bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };

// userSchema
//     .virtual("_password")
//     .set(function (password) {
//         this._password = password;
//         this.salt = uuidv1();
//         this.password = this.securePassword(password);
//     })
//     .get(function () {
//         return this._password;
//     });

// userSchema.methods = {

//     securePassword: function (plainpassword) {
//         if (!plainpassword) return "";
//         try {
//             return crypto
//                 .createHmac("sha256", this.salt)
//                 .update(plainpassword)
//                 .digest("hex");
//         } catch (err) {
//             return "";
//         }
//     }
// };

module.exports = mongoose.model("user", userSchema);