import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedin: false,
  // token:""
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserLogin(state) {
      state.isLoggedin = true;
    },
    setUserLogout(state) {
      state.isLoggedin = false;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
});

export const { setUserLogin, setUserLogout } = authSlice.actions;

export default authSlice.reducer;
