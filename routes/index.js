const express = require('express');
const router = express.Router();
const userRoutes =  require("./user.route");
// const bookingRoutes = require("./booking.route");

    router.get("/api" , async(req, res , next)=>{
        res.json({message: "Car Rental API is not working....."})
    });
    
    router.use("/api/users" , userRoutes);
    // router.use("/bookcar" , bookingRoutes  )


module.exports = router;
