const StatusCodes = require("http-status-codes");
class authenticationError extends Error {
    message;
    statusCode = StatusCodes.UNAUTHORIZED;
    constructor(message) {
        super(message);
        this.message = message;
        this.message = message;
    }
}
module.exports = authenticationError;
