const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const Car = require("../models/Car");

const createBooking = async (data) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Create booking inside the transaction
    const booking = await new Booking(data).save({ session });

    // Update booked time slots in the car model
    const car = await Car.findById(data.car).session(session);
    if (!car) {
      throw new Error("Car not found");
    }

    // Push new booked time slots (ensure uniqueness)
    car.bookedTimeSlots = [
      ...car.bookedTimeSlots,
      ...data.bookedTimeSlots.filter(
        (slot) =>
          !car.bookedTimeSlots.some(
            (existingSlot) =>
              existingSlot.from === slot.from && existingSlot.to === slot.to
          )
      ),
    ];

    await car.save({ session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    return booking;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(error.message);
  }
};

const fetchAllCars = async () => {
  try {
    return await Car.find({});
  } catch (error) {
    throw new Error("Failed to fetch cars: " + error.message);
  }
};

const fetchBookedSlots = async (carId) => {
  try {
    const car = await Car.findById(carId);
    if (!car) throw new Error("Car not found");
    return car.bookedTimeSlots;
  } catch (error) {
    throw new Error("Failed to fetch booked slots: " + error.message);
  }
};

module.exports = {
  createBooking,
  fetchAllCars,
  fetchBookedSlots,
};
