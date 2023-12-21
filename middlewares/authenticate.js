const authenticationError = require("../errors/authenticationError.js");
const Jwt = require("jsonwebtoken");
const authenticate = async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer")){
        console.log("now")
        throw new authenticationError("Not Authorized");
    }
    const token = authorization.split(" ")[1];
    try {
        const payload = Jwt.verify(token, process.env.JWT_SECRET);
        console.log("here");
        req.user = payload;
        console.log(req.user);
        next();
    }
    catch (error) {
        console.log(error);
        throw new authenticationError("Not authorized");
    }
};
module.exports = authenticate;
