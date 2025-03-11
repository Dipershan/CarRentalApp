import axios from "axios";
import { message } from "antd";
// import { useNavigate } from "react-router-dom";

// const navigate = useNavigate();




export const userLogin=(reqObj)=>async dispatch=>{
    
  dispatch({type: 'LOADING' , payload:true})

  try {
      const response = await axios.post('http://localhost:7000/api/users/login' , reqObj)
      localStorage.setItem('user' , JSON.stringify(response.data))
      message.success('Login success')
      dispatch({type: 'LOADING' , payload:false})
      setTimeout(() => {
          window.location.href='/'
       
      }, 500);
  } catch (error) {
      console.log(error)
      message.error('Something went wrong')
      dispatch({type: 'LOADING' , payload:false})
  }
}


// export const userLogin = (reqObj) => async dispatch => {
//   dispatch({ type: "LOADING", payload: true });

//   try {
//       const response = await axios.post('http://localhost:7000/api/users/login', reqObj);

      
//       const token = response.data.token; 

     
//       localStorage.setItem('token', token);


//       localStorage.setItem('user', JSON.stringify(response.data.user)); 

//       dispatch({ type: "LOADING", payload: false });
//       message.success("Login Successful");

//   } catch (error) {
//       console.error(error);
//       message.error("Invalid Credentials");
//       dispatch({ type: "LOADING", payload: false });
//   }
// };

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
      const response = await axios.get('http://localhost:7000/api/users/me'); // Example protected endpoint
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
      
      const response = await axios.post('http://localhost:7000/api/users/signup', reqObj);
      console.log(response.data); 
      message.success('Registration successfull')
      setTimeout(() => {
          window.location.href='/login'
       
      }, 500);
     
      dispatch({type: 'LOADING' , payload:false})
    //   if (response.status === 200) { 
    //       message.success(response.data.message);
    //       dispatch({ type: "LOADING", payload: false });          

    //   } else {
     
    //       message.success("Registration Successful");
    //       dispatch({ type: "LOADING", payload: false });
    //   }

  } catch (error) {
      console.error("Registration Error:", error);

      dispatch({ type: "LOADING", payload: false });

      if (error.response) { 
          message.error(error.response.data.message);
      } else if (error.request) { 
          message.error("No response received from the server.");
      } else { 
          message.error("An error occurred during registration.");
      }
  }
};



export const logoutUser = () => dispatch => {
  localStorage.removeItem('token');
  dispatch({ type: "LOGOUT" }); 
};