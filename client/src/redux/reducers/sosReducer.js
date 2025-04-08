const initialState = { loading: false, message: "", error: "" };

const sosReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SOS_REQUEST":
      return { ...state, loading: true, message: "", error: "" };

    case "SOS_SUCCESS":
      return { ...state, loading: false, message: action.payload.message };

    case "SOS_ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default sosReducer;
