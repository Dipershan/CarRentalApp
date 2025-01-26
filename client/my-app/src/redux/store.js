import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './reducers/carsReducer';
import alertsReducer from './reducers/alertsReducers';

const store = configureStore({
  reducer: {
    carsReducer,
    alertsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(), // Thunk is included by default
  devTools: 'production', // DevTools enabled in development
});

export default store;
