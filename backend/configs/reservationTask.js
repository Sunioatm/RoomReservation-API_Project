const moment = require("moment-timezone");
const cron = require("node-cron");
const Room = require("../models/roomModel.js");

const reservationTask = () => {
  cron.schedule("* * * * *", async () => {
    try {
      const currentDateTime = moment().tz("DD/MM/YY HH:mm", "Asia/Bangkok").toDate();
      // To check currentTime
      console.log(currentDateTime);

      // Find all rooms with end time less than or equal to the current time
      
      const roomsToUpdate = await Room.find({
        reserveDate: {
          $elemMatch: { $lte: currentDateTime }
        }
      });
      console.log(roomsToUpdate);

      // To check reserveDate
      roomsToUpdate.forEach((room) => {
        console.log(room.reserveDate);
      });

      // Update the rooms
      await Promise.all(
        roomsToUpdate.map(async (room) => {
          room.reserveDate.pop();
          await room.save();

          // Print every time it has an update.
          console.log("Reservation status updated successfully. (Some room has been removed)");
        })
      );

      // To print every time it updates (but it's too much)
      console.log("Reservation status updated successfully.");

    } catch (error) {
      console.error("Error updating reservation status:", error);
    }
  });
};

module.exports = reservationTask;
