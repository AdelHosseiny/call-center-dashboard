// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

// Create a Redux store with the user slice reducer
const store = configureStore({
  reducer: {
    user: userReducer, // Attach the user reducer to the store
  },
});

export default store;
