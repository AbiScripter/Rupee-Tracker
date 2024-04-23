import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./style.css";
import App from "./App";
import store from "./store";
import { UserContextProvider } from "./context/userContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </UserContextProvider>
);
