const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: [true, "Provide name"],
    },
    expiresAt: {
        type: String,
        required: [true, "Provide Password"],
        default: Date.now() + 5 * 60 * 1000
    },
    for: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
});

otpSchema.pre("save", async function(){
    this.otp = await bcrypt.hash(this.otp, 10);
});


module.exports = mongoose.model("otp", otpSchema);