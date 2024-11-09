import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// eslint-disable-next-line react/prop-types
export default function PrivateRoute({ requiredRole }) {
  const { auth } = useAuth();

  if (!auth?.authToken) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && auth.user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}