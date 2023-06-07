const express = require("express");
const router = express.Router();
const Room = require("../models/roomModel.js");

router.get("/", (req, res) => {
    res.send("hi");
});

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

router.get("/show", async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error.");
    }
});

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

router.get("/:name", async (req, res) => {
    try {
        const name = req.params.name;
        const room = await Room.findOne({ name });

        if (!room) {
            return res.status(404).send("Room not found.");
        }

        res.status(200).json(room);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error: " + error.message);
    }
});

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
  
  
  
  


module.exports = router;
