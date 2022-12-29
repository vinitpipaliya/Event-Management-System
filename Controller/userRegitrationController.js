const userRegistrationModel = require("../Model/userRegistrationModel")


exports.registration = (req, res) => {
    const data = req.body
    const useRegMod = new userRegistrationModel(data);
    useRegMod.save((err, data) => {
        if (err) {
            res.status(400).json({
                err: "Not able to save in database. " + err
            })
        }
        return res.status(200).json({
            message: "Successfully Inserted."
        })
    })
} 