const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    accountName: {
        required:[true, "Enter the account name"],
        type: String,
    },
    accountNumber: {
        required:[true, "Enter the account number"],
        type: String,
    }
})


const bankAccountSchema = new mongoose.Schema({


    _id: {
        type: mongoose.Types.ObjectId,
        required:[true, "The id of the user requesting withdrawal is necessary"]
    },
    bankName: {
        type:String,
        required:[true, "The bank name is required"];
    },
    deposits:{
        type:[accountSchema],
        default:[]
    }
})



module.exports = mongoose.model("bankAccount", bankAccountSchema);