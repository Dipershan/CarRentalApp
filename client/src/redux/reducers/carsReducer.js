
const initialState = {
  cars: [], // ✅ FIX: Correct initial state
};

const carsReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'GET_ALL_CARS': {
          return {
              ...state,
              cars: action.payload, // ✅ FIX: Ensure payload correctly updates state
          };
      }
      default:
          return state;
  }
};

export default carsReducer;


// const initialState = {
//     cars: [8],
//   };
  
//   const carsReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'GET_ALL_CARS' : {
//         return {
//             ...state,
//             cars : action.payload 
//         }
//       }
//       default:
//         return state;
//     }
//   };

//   export default carsReducer;
  
  
  