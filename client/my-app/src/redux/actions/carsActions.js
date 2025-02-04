import axios from "axios";

export const getAllCars = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const { data } = await axios.get("/api/cars/getAllCars");
    dispatch({ type: "GET_ALL_CARS", payload: data }); 
  } catch (error) {
    console.log(error);
  }

  dispatch({ type: "LOADING", payload: false });
};
