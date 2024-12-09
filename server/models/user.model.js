const mongoose  = require("mongoose");
const bcrypt = require("bcrypt")

const UserSchema =  mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    email:{
        type: String,
        required:true,
        unique: true,
        lowercase: true
    },
    password:{
        type:String,
        required : true
    },
    isEmailVerified:{
        type:Boolean,
        required: true,
        default: true
    },
    // role: {
    //     type : String,
    //     enum : [ 'Admin','Renter','Owner'],
    //      required: true
    // },    
},{ timestamps: true}
);

UserSchema.methods.isPasswordMatch = async function (password){
    const user =  this;
    return bcrypt.compare(password ,  user.password);
};
UserSchema.pre('save' , async function (next) {
    const user = this;

    if(user.isModified("password")){
        user.password =  await bcrypt.hash(user.password , 8);        
    }
    next();
})

const User  = mongoose.model("User" , UserSchema );
module.exports = User;