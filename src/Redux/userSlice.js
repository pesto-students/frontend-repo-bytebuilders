import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: null,
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    enableLoading: (state, action) => {
      console.log('iN Enable Loading');
      state.isLoading = true;
    },
    disableLoading: (state, action) => {
      state.isLoading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    getUser: (state, action) => {
      return state.user;
    },
  },
});

export const {
  loginUser,
  logoutUser,
  enableLoading,
  disableLoading,
  setUser,
} = userSlice.actions;

export default userSlice.reducer;
