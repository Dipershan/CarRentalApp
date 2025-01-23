import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './path_to_reducer'; // Adjust this path to your reducer

const store = configureStore({
  reducer,
  devTools: composeWithDevTools(),
});

export default store;
