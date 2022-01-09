const mongoose = require("mongoose");
const {MONGOURL} = require("./keys");


async function dbConnection() {
    try {
        await mongoose.connect(MONGOURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

module.exports = dbConnection;