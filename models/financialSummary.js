const mongoose = require("mongoose");

const fsSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    totalInvested: {
        default: 0,
        type: Number,
    },
    availableFunds: {
        default: 0,
        type: Number,
    },
    PurchaseCount: {
        default: 0,
        type: Number,
    }
});



module.exports = mongoose.model("financialSummary", fsSchema);