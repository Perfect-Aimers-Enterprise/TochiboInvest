const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema({
    email: {
        default: 0,
        type: String,
    },
    totalInvested: {
        default: 0,
        type: Number,
    },
    date: {
        default: Date.now().toString(),
        type: Date,
    },
    Team:{
        type:String,
        enum:[ "A", "B","C" ]
    }
})

const referralsSchema = new mongoose.Schema({
    referrals:{
        type:[referralSchema],
        default:[]
    },
    _id: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    referralsCount:{
        type:Number,
        default:0
    }
});

// referralsSchema.pre("findOneAndUpdate", function(doc){
//     // console.log(this);
//     console.log(doc.referrals.length);
//     doc.referralsCount = ++doc.referrals.length;
// });


module.exports = mongoose.model("referrals", referralsSchema);