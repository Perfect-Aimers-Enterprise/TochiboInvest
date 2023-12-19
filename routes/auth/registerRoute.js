const express = require("express");
const router = express.Router();
const { preRegister, resendOTP, register, testingStuff } = require ("../../controllers/auth/register.js");

router.route("/sendOTP").post(preRegister).get(testingStuff);
router.route("/resendOTP/:id").get(resendOTP);
router.route("/").post(register);

module.exports = router;