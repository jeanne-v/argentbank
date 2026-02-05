import { BrowserRouter as Router, Routes, Route } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Layout from "../Layout";
import Home from "../../pages/Home";
import LogIn from "../../pages/LogIn";
import Profile from "../../pages/Profile";

import ProtectedRoute from "../ProtectedRoute";

import { fetchUser } from "../../slices/userSlice";

export default function AppRoutes() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userToken = useSelector((state) => state.auth.userToken);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn && userToken) {
      dispatch(fetchUser(userToken));
    }
  }, [isLoggedIn, userToken, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<LogIn />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
