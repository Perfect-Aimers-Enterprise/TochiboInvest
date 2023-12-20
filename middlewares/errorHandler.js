const { StatusCodes } = require("http-status-codes");
const userModel = require("../models/User");
const errorHandler = async(err, req, res, next) => {
    console.log(err);
    const customError = {
        message: err.message || "Internal Server Error",
        statusCode: err.statusCode || 500
    };
    if (err.name === "CastError") {
        customError.message = "Job Not Found";
        customError.statusCode = StatusCodes.NOT_FOUND;
    }
    if (err.name === "ValidationError") {
        customError.message = `Enter Valid Values for ${Object.keys(err.errors).join(" ,")}`;
    }
    if (err.code === 11000) {
        const user = await userModel.findOne({ email:req.body.email });
        if(user.status==="pending"){
            console.log(user.email);
            return( res.status(200).send({ msg:"An email of a pending user", id:user._id }));
        }

        customError.message = `A Duplicate Value of ${Object.values(err.keyValue).join(" ,")} already Exists`;
        customError.statusCode = 409;
    }
    res.status(customError.statusCode).send({ message: customError.message });
    // res.status(customError.statusCode as number ).send({ err });
};
module.exports = errorHandler;
