// redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Create a slice for user information
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user_name: '',
  },
  reducers: {
    setUserName: (state, action) => {
      state.user_name = action.payload;
    },
  },
});

// Export actions and reducer
export const { setUserName } = userSlice.actions;
export default userSlice.reducer;
