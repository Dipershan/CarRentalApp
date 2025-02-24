const router =  require("express").Router();
const carController =  require("../controllers/car.controller");

router.route("/getAllCars").get(carController.getAllCars);


module.exports = router;