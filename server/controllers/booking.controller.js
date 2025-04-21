const bookingService = require("../services/booking.service");

const bookCar = async (req, res) => {
  try {
    await bookingService.bookCar(req.body);
    res.status(201).json({ message: "Booking successful!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllCars = async (req, res) => {
  try {
    const cars = await bookingService.getAllCars();
    res.status(200).json(cars);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBookedSlots = async (req, res) => {
  try {
    const slots = await bookingService.getBookedSlots(req.params.carId);
    res.status(200).json(slots);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  bookCar,
  getAllCars,
  getBookedSlots,
  getAllBookings,
};
