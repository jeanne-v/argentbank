import { Navigate } from "react-router";

export default function ProtectedRoute({ children, isLoggedIn }) {
  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
