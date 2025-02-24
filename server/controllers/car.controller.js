const carService = require("../services/car.service");

exports.getAllCars = async (req, res) => {
    try {
        const cars = await carService.getAllCars();
        res.status(200).json(cars);
    } catch (error) {
        res.status(400).json({ message: "Error fetching cars" });
    }
};
