import axios from "axios";
import { message } from "antd";




export const userLogin = (reqObj) => async dispatch => {
  dispatch({ type: "LOADING", payload: true });

  try {
      const response = await axios.post('api/users/login', reqObj);

      
      const token = response.data.token; 

     
      localStorage.setItem('token', token);


      localStorage.setItem('user', JSON.stringify(response.data.user)); 

      dispatch({ type: "LOADING", payload: false });
      message.success("Login Successful");

  } catch (error) {
      console.error(error);
      message.error("Invalid Credentials");
      dispatch({ type: "LOADING", payload: false });
  }
};

export const setAuthToken = (token) => {
  if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
      delete axios.defaults.headers.common['Authorization'];
  }
};

export const getUserData = () => async dispatch => {
  const token = localStorage.getItem('token');
  setAuthToken(token); // Set the token for all subsequent requests

  try {
      const response = await axios.get('/api/users/me'); // Example protected endpoint
      dispatch({ type: "GET_USER_DATA", payload: response.data });
  } catch (error) {
      console.error(error);
      // Handle error (e.g., token expired)
      localStorage.removeItem('token'); // Remove invalid token
      dispatch({ type: "LOGOUT" }); // Dispatch a logout action if needed
  }
};

// export const userLogin =(reqObj)=>async dispatch=>{
//     dispatch({ type: "LOADING", payload: true });

//     try {
//       const response = await axios.post('api/users/login' , reqObj)
//       localStorage.setItem('user' , JSON.stringify(Response.data))
      
//       dispatch({ type: "LOADING", payload: false }); 
//     } catch (error) {
//       console.log(error);
//       message.error("Invalid Credentials");
//       dispatch({ type: "LOADING", payload: false });    
// }
//     }
  
    

export const userRegister = (reqObj) => async dispatch => {
  dispatch({ type: "LOADING", payload: true });

  try {
      const response = await axios.post('api/users/signup', reqObj);

      if (response.status === 200) { 
          message.success(response.data.message); // Access the message from the response
          dispatch({ type: "LOADING", payload: false });

          // Decide if you want to automatically log the user in here (as discussed before)
          // If yes, dispatch the userLogin action:
          // dispatch(userLogin(reqObj)); // Assuming reqObj has the login details
      } else {
          // Handle other successful status codes if needed
          message.success("Registration Successful");
          dispatch({ type: "LOADING", payload: false });
      }

  } catch (error) {
      console.error("Registration Error:", error);

      dispatch({ type: "LOADING", payload: false });

      if (error.response) { // Check if the server returned an error response
          message.error(error.response.data.message); // Access the error message from the backend
      } else if (error.request) { // Check if the request was made but no response was received
          message.error("No response received from the server.");
      } else { // Otherwise, it's a client-side error
          message.error("An error occurred during registration.");
      }
  }
};

// export const userRegister =(reqObj)=>async dispatch=>{
//     dispatch({ type: "LOADING", payload: true });

//     try {
//       const response = await axios.post('api/users/signup' , reqObj)      
//       message.success("Login Sucess");
//       dispatch({ type: "LOADING", payload: false }); 
//     } catch (error) {
//       console.log(error);
//       message.error("Invalid Credentials");
//       dispatch({ type: "LOADING", payload: false });
//     }
  
   
// }


export const logoutUser = () => dispatch => {
  localStorage.removeItem('token');
  dispatch({ type: "LOGOUT" }); // Dispatch a logout action to reset Redux state
};