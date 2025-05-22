import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi.js"; // import your RTK Query api

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    userLoggedOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

// thunk to log out and reset api state
export const logoutUser = () => (dispatch) => {
  dispatch(userLoggedOut());
  dispatch(authApi.util.resetApiState());
};

export default authSlice.reducer;
