const express = require("express");
const router = express.Router();
const UserController = require("../controller/userController.js")

// API สำหรับการลงทะเบียนผู้ใช้งานใหม่
router.post("/register", UserController.userRegister)

// API สำหรับ login โดยสามารถใช้ Email หรือ Username
router.post("/login", UserController.userLogin)

module.exports = router;
