const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cron = require("node-cron");
const reservationTask = require("./reservationTask.js");
const { MONGO_URI_USER, MONGO_URI } = process.env;


const connectDB = async () => {
    try {
        const connUser = await mongoose.connect(MONGO_URI_USER);
        console.log(`MongoDB User Connected: ${connUser.connection.host}`);

        const connRoom = await mongoose.connect(MONGO_URI_USER);
        console.log(`MongoDB Room Connected: ${connRoom.connection.host}`);

        // Schedule the reservation task to run

        // const task = cron.schedule("* * * * *", () => {
        //     reservationTask();
        // });

        // Start the cron job

        // task.start();

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = {
    connectDB: connectDB,
};
