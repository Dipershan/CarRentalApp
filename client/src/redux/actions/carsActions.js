import axios from "axios";

export const getAllCars = () => async (dispatch) => {
    dispatch({ type: "LOADING", payload: true });

    try {
        const { data } = await axios.get("http://localhost:7000/api/cars/getAllCars");
        dispatch({ type: "GET_ALL_CARS", payload: data });
    } catch (error) {
        console.error("Error fetching cars:", error);
        dispatch({
            type: "ERROR",
            payload: error.response?.data?.message || "Something went wrong",
        });
    }

    dispatch({ type: "LOADING", payload: false });
};
