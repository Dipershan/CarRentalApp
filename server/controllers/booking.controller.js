const { bookingCar } = require("../services/booking.service");

const bookingService = requrie("../services/booking.service.js");

const bookCar = async(req, res)=>{
    try {
       req.body.transactionId = "1234";
       const result= await bookingCar(req.body);
       res.send("Your booking is successfully completed");
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }

}

module.exports = {
    bookCar
}