import { Navigate, Outlet } from "react-router-dom";
import Home from "../Pages/Home/Home";

function ProtectedRoute({ isAuth, redirectPath = "/home" }) {
  if (!isAuth) {
  }
  return <Outlet />;
}

export default ProtectedRoute;
