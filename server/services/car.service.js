const Car = require("../models/car.model");

exports.getAllCars = async () => {
    return await Car.find({});
};

