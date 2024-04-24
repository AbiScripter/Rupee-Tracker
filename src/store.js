import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./accountSlice";
// import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: {
    account: accountSlice,
  },
  // middleware: [thunk], // middleware automatically added in redux toolkit no need to mention
});

export default store;
