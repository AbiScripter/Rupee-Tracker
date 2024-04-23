import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import accountSlice from "./accountSlice";

const store = configureStore({
  reducer: {
    account: accountSlice,
  },
  // middleware: [thunk], // middleware automatically added in redux toolkit no need to mention
});

export default store;
