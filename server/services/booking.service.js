const mongoose = require("mongoose");
const Booking = require("../models/booking.model");
const Car = require("../models/car.model");

const bookCar = async (data) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      transactionRef,
      user,
      car,
      totalHours,
      totalAmount,
      driverRequired,
      bookedTimeSlots,
    } = data;

    if (!transactionRef) {
      throw new Error("Transaction reference is missing from Paystack");
    }

    const newBooking = new Booking({
      user,
      car,
      totalHours,
      totalAmount,
      driverRequired,
      bookedTimeSlots,
      transactionId: transactionRef,
    });

    await newBooking.save({ session });

    const carToUpdate = await Car.findById(car).session(session);
    if (!carToUpdate) throw new Error("Car not found");

    carToUpdate.bookedTimeSlots = [
      ...carToUpdate.bookedTimeSlots,
      ...[bookedTimeSlots].filter(
        (slot) =>
          !carToUpdate.bookedTimeSlots.some(
            (existingSlot) =>
              existingSlot.from === slot.from && existingSlot.to === slot.to
          )
      ),
    ];

    await carToUpdate.save({ session });

    await session.commitTransaction();
    session.endSession();

    return newBooking;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getAllCars = async () => {
  return await Car.find({});
};

const getBookedSlots = async (carId) => {
  const car = await Car.findById(carId);
  if (!car) throw new Error("Car not found");
  return car.bookedTimeSlots;
};

const getAllBookings = async () => {
  return await Booking.find().populate("car");
};

module.exports = {
  bookCar,
  getAllCars,
  getBookedSlots,
  getAllBookings,
};
