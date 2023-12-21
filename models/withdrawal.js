const mongoose = require("mongoose");

const withdrawalSchema = new mongoose.Schema({
    accountName: {
        required: [true, "The account name is required"],
        type: String,
    },
    accountNumber: {
        required: [true, "The account number is required"],
        type: Number,
    },
    bankName:{
        type: String,
        required: [true, "Bank name is required" ]
    },
    _id: {
        type: Number,
        required:[true, "The id of the user requesting withdrawal is necessary"]
    },
    amount:{
        type:Number,
    },
    date:{
        type:String,
        required: [true, "The date of withdrawal is required"]
    },
    status:{
        type:String,
        default:"pending",
        enum:["pending", "successful"]
    }
})


const withdrawalsLogSchema = new mongoose.Schema({

    _id: {
        type: mongoose.Types.ObjectId,
        required:[true, "The id of the user requesting withdrawal is necessary"]
    },
    withdrawals:{
        type:[withdrawalSchema],
        default:[] 
    }

})



module.exports = mongoose.model("withdawalsLog", withdrawalsLogSchema);