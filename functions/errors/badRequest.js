const StatusCodes = require("http-status-codes");
class BadRequest extends Error {
    message;
    statusCode = StatusCodes.BAD_REQUEST;
    constructor(message) {
        super(message);
        this.message = message;
        this.message = message;
    }
}
module.exports = BadRequest;
