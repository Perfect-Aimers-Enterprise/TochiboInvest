require('dotenv').config()
const connectDB = require('./db/connect')
const acctDetails = require('./models/acc_details')
const acctDetailJson = require('./account.json')


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI2)
        console.log('Also successful');
        await acctDetails.deleteMany()
        await acctDetails.create(acctDetailJson)
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

start()