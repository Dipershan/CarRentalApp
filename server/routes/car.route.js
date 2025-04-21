const router = require("express").Router();
const carController = require("../controllers/car.controller");

router.get("/getallcars", carController.getAllCars);
router.post("/addcar", carController.addCar);
router.post("/editcar", carController.editCar);
router.post("/deletecar", carController.deleteCar);

module.exports = router;
