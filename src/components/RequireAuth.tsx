
import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth() {
  return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/unauthorised" replace />;
}