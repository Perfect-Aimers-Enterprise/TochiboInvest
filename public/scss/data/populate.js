require('dotenv').config()
const connectDB = require('./db/connect')
const product = require('./models/products')

const jsonProduct = require('./product.json')


const start = async () => {
    try {
        // console.log(jsonProduct);
        await connectDB(process.env.MONGO_URI2)
        console.log('successfull!!!');
        await product.deleteMany()
        await product.create(jsonProduct);
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

start()