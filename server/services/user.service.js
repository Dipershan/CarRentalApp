const User = require("../models/user.model");
const bcrypt  = require("bcrypt");

//Register User
const createUser =  async(body)=>{
    try {
        //check if the user already exits or not
        const findUser =  await User.findOne({email: body.email});
        if(findUser){
            throw new Error("User already exist");
        };
        const createUser =  await User.create(body);
        return createUser;
        
    } catch (error) {        
        console.log("Register Error",error);
        throw error;
    }

};

//Login User
const loginUser = async(email , password) =>{
    try {
        const user = await User.findOne({email: email});
        if(!user){
            throw new Error("Incorrect Email or Password");
        }                
        const isPasswordCorrect =  await user.isPasswordMatch(password);
        if(!isPasswordCorrect){
            throw new Error("Incorrect email or password")
        }
        console.log('object' , user);
        return user;

    } catch (error) {
        console.log("Login error:" ,error );
        throw error;
    }
    
};

//To get all user
const getAllUsers =  async ()=>{
    try {
        const user  =  User.find({}, '-password');
        return  user
    } catch (error) {
      console.log(error)  ;
      throw error;
    }
};


const resetUserPassword = async (email, password) => {
    try {
      const user = await User.findOne({ email: email });
  
      console.log("user", user);
  
      if (!user) {
        throw new Error("Incorrect email or password");
      }
  
      const hashPassword = await bcrypt.hash(password, 10);
  
      const updateUser = await User.findOneAndUpdate(
        { email: email },
        { password: hashPassword },
        {
          new: true,
        }
      );
      return updateUser;
    } catch (error) {
      console.error("Password reset error:", error);
      throw error;
    }
  };

  
const deleteUser = async (userId) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
  
      await User.findByIdAndDelete(userId);
      return { message: "User deleted successfully!" };
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };
  
  

module.exports ={
    createUser,
    loginUser,
    resetUserPassword,
    deleteUser
}