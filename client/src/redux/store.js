import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './reducers/carsReducer';
import alertsReducer from './reducers/alertsReducers';
import sosReducer from './reducers/sosReducer';


const store = configureStore({
  reducer: {
    carsReducer,
    alertsReducer,
    sosReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(),
  devTools: 'production',
});

export default store;
