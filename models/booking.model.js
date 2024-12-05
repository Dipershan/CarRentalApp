const mongoose =  require("mongoose");

const BookingSchema = new mongoose.Schema({

    car:{
        type: mongoose.Schema.Types.ObjectId , 
        ref: 'cars'        
    },
    user : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },  
     bookedTimeSlots : [
        {
        from:{type: String , required: true},
        to :{type:String ,  required: true }
        }
    ],
    totalHours : {type: Number},
    totalAmount: {
        type:Number,
    },
    transactionId : {
        type: String,
        unique: true
    },
    status:{
        type: String,
        enum :["Pending", "Confirmed","Cancelled"],
        default: "Pending"
    }
},{timestamps: true });

// BookingSchema.index({ car: 1 });
// BookingSchema.index({ user: 1 });
// BookingSchema.index({ status: 1 });

module.exports = mongoose.model("Booking" , BookingSchema);

 