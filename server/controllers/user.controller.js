const userService = require("../services/user.service");


const register =  async (req,  res)=>{
    try {
        await userService.createUser(req.body);

        res.status(200).send({
            message: "User Created Sucessfully",
        });
    } catch (error) {
        console.log(error);
        res
        .status(401)
        .json({message: error.message || "An error during Register"});

    }
}

const login  = async(req, res) =>{
    const {email , password} =  req.body;
    try {
        const user =  userService.loginUser(email , password);
        res.status(200).send({message: "Login Successfully"});
    } catch (error) {
        console.log(error);
        res
        .status(401)
        .json({message : "Unable to Login"});
    }
};


const resetUserPassword = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      await userService.resetUserPassword(email, password);
  
      res.json({ message: "Password reset successful!" });
    } catch (error) {
      res
        .status(401)
        .json({ message: error.message || "An error occurred during password reset" });
    }
  };
  
const deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
      await userService.deleteUser(userId);
      res.json({ message: "User deleted successfully!" });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "An error occurred while deleting the user" });
    }
  };
  
  


module.exports = {
    register,
    login,
    resetUserPassword,
    deleteUser
    
}
