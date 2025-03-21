const router = require("express").Router();
const carController = require("../controllers/car.controller");

router.get("/getAllCars", carController.getAllCars);
router.post("/addCar", carController.addCar);
router.post("/editCar", carController.editCar);
router.post("/deleteCar", carController.deleteCar);

module.exports = router;
