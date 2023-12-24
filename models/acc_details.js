const mongoose = require('mongoose')

const acctDetails = new mongoose.Schema({
    accName: {
        type: String,
        require: true,
    },
    accNo: {
        type: Number,
        require: true,
    },
    bankName: {
        type: String,
        require: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('accDetails', acctDetails)