import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import store from "./store";

import { BrowserRouter as Router } from "react-router";
import AppRoutes from "./components/AppRoutes";

import "./main.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <AppRoutes />
    </Router>
  </Provider>,
);
