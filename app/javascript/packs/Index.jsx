import React from "react";
import { render } from "react-dom";
import App from "../components/App";
import { Provider } from "react-redux";
import configureStore from "../common/configureStore";

const store = configureStore();

document.addEventListener("DOMContentLoaded", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.body.appendChild(document.createElement("div"))
  );
});
