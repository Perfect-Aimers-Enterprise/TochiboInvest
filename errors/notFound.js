const StatusCodes = require("http-status-codes");
class NotFound extends Error {
    message;
    statusCode = StatusCodes.NOT_FOUND;
    constructor(message) {
        super(message);
        this.message = message;
        this.message = message;
    }
}
module.exports = NotFound;
