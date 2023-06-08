const express = require("express");
const router = express.Router();
const RoomController = require("../controller/roomController.js")

// ใช้ทดสอบว่า route ถูกต้อง
router.get("/", (req, res) => {
  res.send("hi");
});

// สร้างห้องประชุมใหม่
router.post("/create", RoomController.roomCreate)

// แสดงห้องประชุมทั้งหมด
router.get("/show", RoomController.showAllRoom)

// หาห้องประชุมที่ต้องการด้วย id (roomId auto increment เองทีละ 1)
router.get("/:roomId", RoomController.getRoomById)
// หาห้องประชุมด้วยชื่อ
router.get("/name/:name", RoomController.getRoomByName)

router.post("/check", RoomController.roomCheck)

// จองห้องประชุม
router.post("/reserve", RoomController.roomReserve)

// ยกเลิกห้องประชุม
router.post("/cancel", RoomController.roomCancel)

module.exports = router;
