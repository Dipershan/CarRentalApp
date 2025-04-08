import axios from "axios";
import { message } from "antd";

export const sendSOSAlert = (data) => async (dispatch) => {
  
  dispatch({ type: "SOS_REQUEST" });

  try {
    const response = await axios.post("/api/sos", data);

    
    dispatch({ type: "SOS_SUCCESS", payload: response.data });

    message.success("🚨 SOS Alert Sent Successfully!");
  } catch (error) {
    dispatch({
      type: "SOS_ERROR",
      payload: error.response?.data?.message || "Something went wrong",
    });

    message.error("❌ Failed to send SOS alert.");
  }
};
