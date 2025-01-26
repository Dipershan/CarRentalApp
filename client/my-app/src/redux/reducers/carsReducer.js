const initialState = {
    cars: [],
  };
  
  const carsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_ALL_CARS' : {
        return {
            ...state,
            cars : action.payload 
        }
      }
      default:
        return state;
    }
  };

  export default carsReducer;
  
  
  