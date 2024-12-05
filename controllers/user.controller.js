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


























// const User  =  require("../models/user.model");

// const register =  async(req, res)=>{
//     try {
//         const {fullName ,email , password  } = req.body;
//         const user =  new User({fullName ,  email ,  password});
//         await user.save();
//         res.status(201).json({message:  "User Registered  Successfully"});
//     } catch (error) {     
//         console.log(error)   ;
//         res.send({message: "Error Creating User"});
//     }
// };

// const login = async () =>{
//     try {
//         const {email ,   password} =  req.body;
//         const user = await User.findOne({email});
//         if(!user) throw new Error ("Invalid Credentials");

//         res.json({message: "Login Successfully"});

//     } catch (error) {
//         console.log(error);
//         res.send({message : "Unable to Login"})
//     }
// };

// const getAllUser = async (req , res)=>{
//     try {
//         const query =  req.query;
//         console.log("Query" ,  query);
//         const users = await User.find()
//         res.json({message: "All the available user"})
//     } catch (error) {
//         console.log(error);
//         res.send({message: "Unable to get user"})
//     }
// }

// const getById = async(req, res)=>{
//     const {id} =  req.params;
//     try {
//     const user = awaitUser.findById(id) ;
//      res.json({message: `User By Id ${user}`});
//     } catch (error) {
//         console.log(error);
//         res.json({message: "Unable to get User"});  
//     }

// const deleteUser = async (req , res)=>{
//     const {id}= req.params;
//     try {
//         const user = await User.deleteOne({_id:id})
//         res.json({message: "Deleted User"});
//     } catch (error) {
//         console.log(error);
//         res.send({message: "Failed To Delete"})
//     }
// }
// }