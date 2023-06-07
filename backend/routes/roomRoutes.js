const express = require("express");
const router = express.Router();
const Room = require("../models/roomModel.js");

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

router.get("/", (req, res) => {
  res.send("hi");
});

module.exports = router;
