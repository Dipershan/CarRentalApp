import axios from "axios";
import { message } from "antd";


export const userLogin =(reqObj)=>async dispatch=>{
    dispatch({ type: "LOADING", payload: true });

    try {
      const response = await axios.post('api/users/login' , reqObj)
      localStorage.setItem('user' , JSON.stringify(Response.data))
      
      dispatch({ type: "LOADING", payload: false }); 
    } catch (error) {
      console.log(error);
      message.error("Invalid Credentials");
      dispatch({ type: "LOADING", payload: false });
}
    }
  
    



export const userRegister =(reqObj)=>async dispatch=>{
    dispatch({ type: "LOADING", payload: true });

    try {
      const response = await axios.post('api/users/signup' , reqObj)      
      message.success("Login Sucess");
      dispatch({ type: "LOADING", payload: false }); 
    } catch (error) {
      console.log(error);
      message.error("Invalid Credentials");
      dispatch({ type: "LOADING", payload: false });
    }
  
   
}