const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!(username && email && password)) {
      return res.status(400).send("Missing required fields.");
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User already exists.");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});

router.post("/login", async (req, res) => {
    try {
      const { identifier, password } = req.body;
  
      if (!(identifier && password)) {
        return res.status(400).send("Missing required fields.");
      }
  
      // Check if the identifier is either an email or a username
      const user = await User.findOne({
        $or: [{ email: identifier }, { username: identifier }],
      });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { user_id: user._id, email: user.email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        user.token = token;
  
        res.status(200).json(user);
      } else {
        res.status(401).send("Invalid email/username or password.");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error.");
    }
  });
  
module.exports = router;
