const mongoose = require("mongoose");

const adminWithdrawalRequest = new mongoose.Schema({
    userID:{
        type: mongoose.Types.ObjectId,
        required: [true, "The id of the user is required"]
    },
    _id:{
        type: mongoose.Types.ObjectId,
        required: [true, "The id of the request is required"]
    },
    date: {
        type: String,
        required: [true, "Provide date"],
    },
    email: {
        type: String,
        required: [true, "Provide email"]
    },
    accountName: {
        type: String,
        required:[true, 'Insert account number']
    },
    accountNumber: {
        type: String,
        required:[true, 'Insert account number']
    },
    bankName: {
        type: String,
        required:[true, 'Insert bank name']
    },
    amount:{
        type:Number,
    }
});



module.exports = mongoose.model("AdminWithReq", adminWithdrawalRequest);