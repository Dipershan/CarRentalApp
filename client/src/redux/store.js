import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './reducers/carsReducer';
import alertsReducer from './reducers/alertsReducers';

const store = configureStore({
  reducer: {
    carsReducer,
    alertsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(),
  devTools: 'production',
});

export default store;
