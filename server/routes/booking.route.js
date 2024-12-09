const router =  require("express").Router;
const Booking =  require("../models/booking.model");

router.post("/bookcar" ,  async(req , res)=>{
    req.body.transactionId =  '1234'
    try {
        const newBooking  =  new Booking(req.body);

        await newBooking.save();
        res.send("Your Booking is Successfull" )
    } catch (error) {
        return res.status(400).json(error);
    }
})
