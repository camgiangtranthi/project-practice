import { Navigate, Outlet } from "react-router-dom";
import { UserResponse } from "./shared/models/user";

const getUserFromLocalStorage = (): UserResponse => {
  return JSON.parse(localStorage.getItem("current_user") || "false");
};

export const PrivateRoute = () => {
  return getUserFromLocalStorage() ? <Outlet /> : <Navigate to="/signin" />;
};
