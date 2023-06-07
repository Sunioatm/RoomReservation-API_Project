const express = require("express");
const router = express.Router();
const Room = require("../models/roomModel.js");
const moment = require("moment-timezone");

// ใช้ทดสอบว่า route ถูกต้อง
router.get("/", (req, res) => {
    res.send("hi");
});

// สร้างห้องประชุมใหม่
router.post("/create", async (req, res) => {
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

        res.status(201).json(room);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error.");
    }
});

// แสดงห้องประชุมทั้งหมด
router.get("/show", async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error.");
    }
});

router.get("/check", async (req, res) => {
    try {
        const { identifier, dateTime } = req.body; // in this format "DD/MM/YY HH:mm"

        if (!(identifier && dateTime)) {
            return res.status(400).send("Missing required fields.");
        }

        const searchQuery = isNaN(identifier) ? { name: identifier } : { roomId: parseInt(identifier) };

        const room = await Room.findOne(searchQuery);

        if (room && room.canReserve) {
            res.status(200).send("This room is available");
        } else {
            res.status(409).send("This room is unavailable");
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error.");
    }
});


// หาห้องประชุมที่ต้องการด้วย id (roomId auto increment เองทีละ 1)
router.get("/:roomId", async (req, res) => {
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
});

// หาห้องประชุมด้วยชื่อ
router.get("/name/:name", async (req, res) => {
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
});

// จองห้องประชุม
router.post("/reserve", async (req, res) => {
    try {
        const { roomId, start, end } = req.body;

        const room = await Room.findOne({ roomId });

        if (!room) {
            return res.status(404).send("Room not found.");
        }

        if (room.canReserve) {
            room.start = moment.tz(start, "DD/MM/YY HH:mm", "Asia/Bangkok").toDate();
            room.end = moment.tz(end, "DD/MM/YY HH:mm", "Asia/Bangkok").toDate();
            room.canReserve = false;
            
            await room.save();
            res.status(200).json(room);

        } else {
            res.status(409).send("This room is already reserved.")
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error: " + error.message);
    }
});

// ยกเลิกห้องประชุม
router.post("/cancel", async (req, res) => {
    try {
        const { roomId } = req.body;

        const room = await Room.findOne({ roomId });

        if (!room) {
            return res.status(404).send("Room not found.");
        }

        room.start = null;
        room.end = null;
        room.canReserve = true;

        await room.save();

        res.status(200).json(room);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error: " + error.message);
    }
});


module.exports = router;
