require( "express-async-errors");
require("dotenv").config();
// Security
const cors = require("cors");
const helmet = require("helmet");
const xssCleaner = require("xss-clean"); /* xss-cleaner dependency was written in javascript and has no types declaration file for TypeScript so nothing could be done about the red squiggle */
const rateLimiter = require("express-rate-limit");
const connectDB = require("./db/connect.js");
// Import express and initialise app
const express = require("express");
let app = express();
// Import Middlewares
const errorHandler = require("./middlewares/errorHandler.js");
const notFound =  require("./middlewares/notFound.js");
const authenticate = require("./middlewares/authenticate.js");
const detailsRouter = require("./routes/details.js")
//Import Ruters
// const jobRouter = require("./routes/Jobs.js");
const auth = require("./routes/auth");
const register = require("./routes/auth/registerRoute.js");
const transacRouter = require("./routes/transactions.js");

const multer = require('multer')
const configuration = require('./configuration/multer')
const productRoute = require('./routes/router')
const accountDetails = require('./routes/acc_router')
const combinedRoute = express.Router()


app.set("trust proxy", 1);
// // const rateLimitOptions = app.use(rateLimiter({
// //     windowMs: 60 * 1000,
// //     limit: 30,
// //     standardHeaders: true
// // }));
app.use(cors());
app.use(helmet());
app.use(xssCleaner());
app.use(express.json());


combinedRoute.use('/api/v1/products', configuration.router)
combinedRoute.use('/api/v1/products', productRoute)
combinedRoute.use('/api/v1/admin', accountDetails)


// app.use("/Tochibo/v1/job", authenticate, jobRouter);
app.use(express.static("public/pages"));

app.use("/Tchibo/v1/auth/login", auth.login);
app.use("/Tchibo/v1/auth/register", auth.register);
app.use("/Tchibo/v1/details", authenticate, detailsRouter);
app.use("/Tchibo/v1/transactions", authenticate, transacRouter);
app.use('/', combinedRoute)

const upload = configuration.upload
app.post('/upload', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
    
        res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
        console.log(error, 'Server not responding due to error');
    }
});


// app.get('/admin', (req, res) => {
//     const adminFilePath = path.join(publicPath, 'admin2.html')
    
//     res.sendFile(adminFilePath)
// })

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
const start = async () => {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log("Server listening at port " + PORT));
};




start();
