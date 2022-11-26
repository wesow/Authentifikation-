const express = require("express");
const User = require("../models/user")
const { signup, singin, signout } = require("../controllers/user")
const router = express.Router();
const { check, validationResult } = require("express-validator");
const validation = [
    check("name", "Name atleast should be 3 characters").isLength({ min: 3 }),
    check("email", "Email should be valid").isEmail(),
    check("password", "password atleast should be 6 characters ").isLength({ min: 6 }),

]

router.post("/signup", validation, signup);

router.post("/signin", validation, singin);

router.get("/signout", signout);


module.exports = router;