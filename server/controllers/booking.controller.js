const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Booking = require("../models/Booking");
const Car = require("../models/Car");

const bookCar = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { token, user, car, totalHours, totalAmount, driverRequired, bookedTimeSlots } = req.body;

    if (!token || !token.id) {
      throw new Error("Payment token is missing");
    }

    // ✅ Create payment using Stripe
    const payment = await stripe.charges.create({
      amount: totalAmount * 100, // Stripe expects amount in smallest currency unit (paise)
      currency: "inr",
      source: token.id,
    });

    if (!payment) throw new Error("Payment failed");

    // ✅ Create new booking inside transaction
    const newBooking = new Booking({
      user,
      car,
      totalHours,
      totalAmount,
      driverRequired,
      bookedTimeSlots,
      transactionId: payment.id, // ✅ Store payment ID from Stripe
    });

    await newBooking.save({ session });

    // ✅ Update car's booked slots
    const carToUpdate = await Car.findById(car).session(session);
    if (!carToUpdate) {
      throw new Error("Car not found");
    }

    // Prevent duplicate slots
    carToUpdate.bookedTimeSlots = [
      ...carToUpdate.bookedTimeSlots,
      ...bookedTimeSlots.filter(
        (slot) =>
          !carToUpdate.bookedTimeSlots.some(
            (existingSlot) =>
              existingSlot.from === slot.from && existingSlot.to === slot.to
          )
      ),
    ];

    await carToUpdate.save({ session });

    // ✅ Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "Booking successful!", payment });
  } catch (error) {
    // ❌ Rollback transaction if error occurs
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ error: error.message });
  }
};

const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find({});
    res.status(200).json(cars);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBookedSlots = async (req, res) => {
  try {
    const { carId } = req.params;
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json(car.bookedTimeSlots);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { bookCar, getAllCars, getBookedSlots };
