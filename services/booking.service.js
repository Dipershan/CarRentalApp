const Booking =  require("../models/booking.model");
const Car =  require("../models/car.model");

const bookingCar = async(data)=>{
    try {
        //Save  the new booking
        const newBooking  = new Booking(data);
        await newBooking.save();

        //it will find a car and update the booked time slots
        const car  = await Car.findOne({_id: data.car});
        if(!car){
            throw new Error("Car not found");
        };
        car.bookedTimeSlots.push(data.bookedTimeSlots);
        await car.save();

        return newBooking;
        
    } catch (error) {
        console.log("Booking error",error);
        throw error;
        
    }
}


module.exports =  {
    bookingCar
}