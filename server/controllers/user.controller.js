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



module.exports = {
    register,
    login,
}
