const userRegistrationModel = require("../Model/userRegistrationModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
    try {
        const { username, password } = req.body
        userRegistrationModel.findOne({ number: username }, async (err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "Invalid Username. " + err
                })
            }

            if (data) {
                // console.log('aaa=' + await bcrypt.compare(password, data.password));
                await bcrypt.compare(password, data.password, function (err, isMatch) {
                    if (err) return res.status(400).send("Invalid Password");

                    if (isMatch) {
                        const token = jwt.sign(
                            { user_id: data._id, username },
                            process.env.SECRET,
                            {
                                expiresIn: "2h",
                            }
                        );

                        res.cookie('token', token, { expire: new Date() + 12 })
                        // save user token

                        // console.log(data)
                        // user
                        return res.status(200).json({ 'token': token, 'id': data._id, 'name': data.name });
                    }
                    else {
                        return res.status(400).send("Invalid Password");
                    }
                });

            }
            else {
                return res.status(400).send("Invalid Username");
            }
        })
    } catch (err) {
        return res.status(400).send("problems " + err);
    }
}

