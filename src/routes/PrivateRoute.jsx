/* eslint-disable react/prop-types */
// PrivateRoute.js
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ requiredRole }) {
  const { auth } = useAuth();

  if (!auth?.authToken) {
    return <Navigate to="/login" />;
  }

  const redirectMap = {
    user: "/",
    admin: "/dashboard",
  };

  if (requiredRole && auth?.user?.role !== requiredRole) {
    return <Navigate to={redirectMap[requiredRole] || "/"} />;
  }

  return <Outlet />;
}