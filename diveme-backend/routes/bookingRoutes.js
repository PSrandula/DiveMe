const express = require("express");
const router = express.Router();
const bookingController = require("../controller/bookingController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, bookingController.createBooking);
router.get("/", bookingController.getAllBookings);
router.get("/user/:userId", bookingController.getBookingsByUser);
router.put("/:id/status", bookingController.updateBookingStatus);

module.exports = router;
