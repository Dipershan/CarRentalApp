require("dotenv").config();
const express =  require("express");
const app = express();
const mongoose = require("mongoose");
// const dbConnection = require('./db');
const PORT = process.env.PORT
const indexRouter =  require("./routes/index");
const cors =  require("cors");


mongoose.connect(
    process.env.DB_URL 
).then(()=>{
    console.log("DataBase Connected Sucessfully");
})
.catch((e)=>{
    console.log("Database Error" ,  e);
});

app.use(express.json());
app.use(cors())
app.use("/", indexRouter);
 
app.get("/" , (req , res)=>{
    res.json("HelloWorld");
});

app.listen(PORT , ()=>{
    console.log(`Application is not runnning on port ${PORT}`);
});