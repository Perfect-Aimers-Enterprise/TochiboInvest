const mongoose = require("mongoose");

const depositSchema = new mongoose.Schema({
    _id:{
        type:Number,
        required:[true, "Id of the deposit is required"]
    },
    accountName: {
        default: 0,
        type: String,
    },
    accountNumber: {
        default: 0,
        type: Number,
    },
    amount:{
        type:Number,
    },
    date:{
        type:Date,
        default:Date.now().toString()
    },
    status:{
        type:String,
        default:"pending",
        enum:["pending", "successful"]
    }
})


const depositLogSchema = new mongoose.Schema({


    _id: {
        type: mongoose.Types.ObjectId,
        required:[true, "The id of the user requesting withdrawal is necessary"]
    },
    deposits:{
        type:[depositSchema],
        default:[]
    }
})



module.exports = mongoose.model("depositLog", depositLogSchema);