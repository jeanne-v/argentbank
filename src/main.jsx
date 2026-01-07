import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router";

import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import LogIn from "./pages/LogIn/LogIn";
import "./main.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<LogIn />} />
      </Route>
    </Routes>
  </Router>
);
