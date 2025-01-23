require("dotenv").config();
const mongoose  = require("mongoose");

function connectDB(){
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // Adjust timeout (30 seconds)
        family: 4 // Use IPv4 to bypass DNS IPv6 issues
      })

        const connection = mongoose.connection
        connection.on('connected ' , ()=>{
            console.log("Mongo DB Connection Successfully");
        })
        connection.on('error',()=>{
            console.log('Mongo DB Connection Error');
        })
    
}
connectDB()

module.exports =  mongoose