const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking.controller");

router.post("/bookcar", bookingController.bookCar);
router.get("/getallcars", bookingController.getAllCars);
router.get("/booked-slots/:carId", bookingController.getBookedSlots);
router.get("/getallbookings", bookingController.getAllBookings);

module.exports = router;
