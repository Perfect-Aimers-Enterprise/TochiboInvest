const mongoose = require("mongoose");
const connect = async (uri) => {
    mongoose.connect(uri);
};
module.exports = connect;
