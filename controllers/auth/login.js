const otpModel = require("../../models/OTP.js");
const User = require("../../models/User.js");
const statusCodes = require("http-status-codes");
const bcrypt = require("bcryptjs");
const { NotFound } = require("../../errors");
const { BadRequest } = require("../../errors");
const { authenticationError } = require("../../errors");


const login = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password)
        throw new BadRequest("InvalidCredentials");
    const user = await User.findOne({ email });
    if (!user)
    throw new NotFound("User Not Found");
    if (!await user.isCorrect(password))
        throw new NotFound("Invalid Credentials");
    const token = await user.createJWT();
    res.status(statusCodes.CREATED).send({ token });
};

module.exports = { login };
