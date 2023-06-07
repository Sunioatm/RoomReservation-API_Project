const cron = require("node-cron");
const Room = require("../models/roomModel.js"); // Import the Room model

const reservationTask = () => {
  cron.schedule("* * * * *", async () => {
    try {
      const currentDateTime = new Date();

      // Find all rooms with end time less than or equal to the current time
      const roomsToUpdate = await Room.find({ end: { $lte: currentDateTime } });

      // Update the rooms
      await Promise.all(
        roomsToUpdate.map(async (room) => {
          room.start = null;
          room.end = null;
          room.canReserve = true;
          await room.save();

          // print everytime it have an update.
          console.log("Reservation status updated successfully.");

        })
      );
        // To print everytime it update (but it too much)
        //console.log("Reservation status updated successfully.");

    } catch (error) {
      console.error("Error updating reservation status:", error);
    }
  });
};

module.exports = reservationTask;
