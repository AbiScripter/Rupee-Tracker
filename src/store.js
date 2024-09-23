import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
// import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
  // middleware: [thunk], // middleware automatically added in redux toolkit no need to mention
});

export default store;
