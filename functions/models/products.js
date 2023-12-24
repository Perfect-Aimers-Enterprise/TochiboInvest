const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    imgs: {
        type: String,
        required:[true,  'Product image must be provided']
    },
    name: {
        type: String,
        required: [true, 'Product Name must be provided'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Product Price must be provided']
    },
    dailyIncome: {
        type: Number,
        required: [true, 'Product dailyincome must be provided']
    },
    days: {
        type: Number,
        required: [true, 'Product days must be provided']
    },
    totalIcome: {
        type: Number,
        required: [true, 'Product totalIcom must be provided']
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})




module.exports = mongoose.model('products', productSchema)