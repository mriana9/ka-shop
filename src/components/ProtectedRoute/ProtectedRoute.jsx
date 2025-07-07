import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("userToken");
  if (!token) {
    console.log("ProtectedRoute");
    return <Navigate to="/login" replace />;
  }
  return children;
}
