const User = require("../models/user");
const { validationResult } = require("express-validator");
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");


exports.signup = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }
    const user = new User(req.body);
    user.save((err, user) => {

        if (err) {
            return res.status(400).json({
                error: "Unable to add user"
            })
        }
        return res.json({
            message: "success",
            user
        })
    })
}


exports.singin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "Email was not found"
            })
        }
        //Authentificate user
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: "Email and Password not match"
            })
        }
        // create token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);

        //put token in cookie
        res.cookie("token", token, { expire: new Date() + 1 });

        // send response to frontend
        const { _id, name, email } = user
        return res.json({
            token,
            user: {
                _id,
                name,
                email
            }
        })

    })
}

exports.signout = (req, res) => {
    res.clearCookie("toker");
    return res.json({
        message: "User signout successfil"
    })
}
