const moment = require("moment-timezone");
const cron = require("node-cron");
const Room = require("../models/roomModel.js");

const reservationTask = () => {
  cron.schedule("0 * * * * *", async () => {
    try {
      const currentDateTime = moment().tz("DD/MM/YY HH:mm", "Asia/Bangkok").toDate();
      console.log(currentDateTime);

      const roomsToUpdate = await Room.find({
        "reserveDateTime.end": { $lte: currentDateTime }
      });

      await Promise.all(
        roomsToUpdate.map(async (room) => {
          room.reserveDateTime = room.reserveDateTime.filter((reservation) => reservation.end > currentDateTime);
          await room.save();

          console.log("Reservation status updated successfully. (Some room reservations have been removed)");
        })
      );

      console.log("Reservation status updated successfully.");

    } catch (error) {
      console.error("Error updating reservation status:", error);
    }
  });
};

module.exports = reservationTask;
