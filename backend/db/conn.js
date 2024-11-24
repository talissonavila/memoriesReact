const mongoose = require("mongoose");

require ('dotenv').config();

async function main() {
    try {
        const username = process.env.DB_USERNAME;
        const password = process.env.DB_PASSWORD;
        const clusterName = process.env.DB_CLUSTERNAME;
        const dbName = process.env.DB_NAME;
        mongoose.set("strictQuery", true);

        await mongoose.connect(
            `mongodb+srv://${username}:${password}@${dbName}.epgzc.mongodb.net/?retryWrites=true&w=majority&appName=${clusterName}`
        );
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(`Error is ${error}`);
    }
}

module.exports = main;
