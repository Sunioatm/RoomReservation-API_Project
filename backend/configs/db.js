const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const { MONGO_URI_USER, MONGO_URI,ROOM } = process.env

const connectDB = async () => {
    try {
        const connUser = await mongoose.connect(MONGO_URI_USER)
        console.log(`MongoDB User Connected : ${connUser.connection.host}`);
        
        const connRoom = await mongoose.connect(MONGO_URI_USER)
        console.log(`MongoDB Room Connected : ${connRoom.connection.host}`);

    } catch {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

module.exports = {
    connectDB: connectDB
}