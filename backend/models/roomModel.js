const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema({
    roomId: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    capacity: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: false
    },
    reserveDate: {
        type: [[Date, Date]],
        default: []
    },

})

roomSchema.pre("save", async function (next) {
    try {
        if (!this.roomId) {
            const highestRoom = await this.constructor.findOne({}, {}, { sort: { roomId: -1 } });
            if (highestRoom) {
                this.roomId = highestRoom.roomId + 1;
            } else {
                this.roomId = 1;
            }
        }
        next();
    } catch (error) {
        next(error);
    }
});


module.exports = mongoose.model("room", roomSchema)