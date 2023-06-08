const Room = require("../models/roomModel.js");
const moment = require("moment-timezone");

const roomCreate = async (req, res) => {
  try {
    const { name, capacity } = req.body;

    if (!(name && capacity)) {
      return res.status(400).send("Missing required fields.");
    }

    const oldRoom = await Room.findOne({ name });
    if (oldRoom) {
      return res.status(409).send("That room already exists.");
    }

    const room = await Room.create({
      name,
      capacity,
    });

    res.status(201).json({ message: "Room Created", room });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};

const showAllRoom = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};

const getRoomById = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const room = await Room.findOne({ roomId });

    if (!room) {
      return res.status(404).send("Room not found.");
    }

    res.status(200).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};

const getRoomByName = async (req, res) => {
  try {
    const inputName = req.params.name.toLowerCase();
    const room = await Room.findOne({ name: { $regex: new RegExp(inputName, 'i') } });

    if (!room) {
      return res.status(404).send("Room not found.");
    }

    res.status(200).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error: " + error.message);
  }
};

const roomCheck = async (req, res) => {
  try {
    const { identifier, start, end } = req.body;
    if (!(identifier && start && end)) {
      return res.status(400).send("Missing required fields.");
    }
    const searchQuery = isNaN(identifier) ? { name: identifier } : { roomId: parseInt(identifier) };
    const room = await Room.findOne(searchQuery);

    if (!room) {
      return res.status(404).send("Room not found.");
    }

    const startReserve = moment.tz(start, "DD/MM/YY HH:mm", "Asia/Bangkok").toDate();
    const endReserve = moment.tz(end, "DD/MM/YY HH:mm", "Asia/Bangkok").toDate();

    // Check if the start time is less than the end time
    if (startReserve >= endReserve) {
      return res.status(400).send("Start time must be less than end time.");
    }

    // const isReserved = room.reserveDateTime.some(({ start: reservedStart, end: reservedEnd }) => {
    //   return (startReserve >= reservedStart && startReserve < reservedEnd) || // ตัดขวา
    //     (endReserve > reservedStart && endReserve <= reservedEnd) || // ตัดซ้าย
    //     (startReserve <= reservedStart && endReserve >= reservedEnd) // ครอบ
    // });

    const isAvailable = room.reserveDateTime.every(({ start: startExisting, end: endExisting }) => {
      return (
        endReserve <= startExisting || startReserve >= endExisting
      );
    });

    if (isAvailable) {
      res.status(409).send("This room is available during the specified time.");
    } else {
      res.status(200).send("This room is unavailable during the specified time.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error.");
  }
};


const roomReserve = async (req, res) => {
  try {
    const { identifier, start, end } = req.body;
    if (!(identifier && start && end)) {
      return res.status(400).send("Missing required fields.");
    }
    const searchQuery = isNaN(identifier) ? { name: identifier } : { roomId: parseInt(identifier) };
    const room = await Room.findOne(searchQuery);

    if (!room) {
      return res.status(404).send("Room not found.");
    }

    const startReserve = moment.tz(start, "DD/MM/YY HH:mm", "Asia/Bangkok").toDate();
    const endReserve = moment.tz(end, "DD/MM/YY HH:mm", "Asia/Bangkok").toDate();

    // Check if the start time is less than the end time
    if (startReserve >= endReserve) {
      return res.status(400).send("Start time must be less than end time.");
    }

    const newReserve = { start: startReserve, end: endReserve };

    // Check if the new reservation overlaps with any existing reservations
    const isAvailable = room.reserveDateTime.every(({ start: startExisting, end: endExisting }) => {
      return (
        endReserve <= startExisting || startReserve >= endExisting
      );
    });

    if (isAvailable) {
      // Add the new reservation to the reserveDateTime array
      room.reserveDateTime.push(newReserve);

      await room.save();
      res.status(200).json(room);
    } else {
      res.status(409).send("This room is unavailable during the specified time.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error: " + error.message);
  }
};


const roomCancel = async (req, res) => {
  try {
    const { identifier, start } = req.body;

    if (!(identifier && start)) {
      return res.status(400).send("Missing required fields.");
    }
    const searchQuery = isNaN(identifier) ? { name: identifier } : { roomId: parseInt(identifier) };
    const room = await Room.findOne(searchQuery);
    if (!room) {
      return res.status(404).send("Room not found.");
    }

    const startReserve = moment.tz(start, "DD/MM/YY HH:mm", "Asia/Bangkok").toDate();

    // Find the index of the reservation with matching start time
    const reservationIndex = room.reserveDateTime.findIndex(({ start: startExisting }) => {
      return startReserve.getTime() === startExisting.getTime();
    });

    if (reservationIndex !== -1) {
      // Remove the reservation from the reserveDateTime array
      room.reserveDateTime.splice(reservationIndex, 1);

      await room.save();
      res.status(200).json({ message: "Cancel successfully", room });
    } else {
      res.status(404).send("Reservation not found.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error: " + error.message);
  }
};

module.exports = {
  roomCreate,
  showAllRoom,
  getRoomById,
  getRoomByName,
  roomCheck,
  roomCreate,
  roomReserve,
  roomCancel
};
