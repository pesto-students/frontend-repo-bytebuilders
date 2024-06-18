import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
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
      state.isLoading = true;
    },
    disableLoading: (state, action) => {
      state.isLoading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
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
