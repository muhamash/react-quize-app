/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ requiredRole }) {
  const { auth } = useAuth();

  if (!auth?.authToken) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && auth.user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};