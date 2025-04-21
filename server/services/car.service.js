const Car = require("../models/car.model");

exports.getAllCars = async () => {
    return await Car.find({});
};


exports.addCar = async (carData) => {
    const newCar = new Car(carData);
    return await newCar.save();
};

exports.editCar = async (carData) => {
    return await Car.findByIdAndUpdate(carData._id, carData, { new: true });
};

exports.deleteCar = async (carId) => {
    return await Car.findByIdAndDelete(carId);
};
