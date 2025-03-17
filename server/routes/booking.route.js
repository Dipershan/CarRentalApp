const express = require("express");
const router = express.Router();

const { bookCar, getAllCars, getBookedSlots } = require("../controllers/bookingController");

router.post("/book", bookCar);

router.get("/cars", getAllCars);

router.get("/booked-slots/:carId", getBookedSlots);

module.exports = router;
