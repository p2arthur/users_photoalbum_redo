import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import { store } from "./store";
import { Provider } from "react-redux";

const rootElement = document.querySelector("#root");

const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
