import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducer/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});



// import { configureStore, createSlice } from "@reduxjs/toolkit";

// const initialAuthState = { isAuthenticated: false };

// const authSlice = createSlice({
//   name: "authentication",
//   initialState: initialAuthState,
//   reducers: {
//     login(state) {
//       state.isAuthenticated = true;
//     },
//     logout(state) {
//       state.isAuthenticated = false;
//     },
//   },
// });

// const initialExpenseState={};

// const store = configureStore({});

// export default store;
