import { isAuthenticated } from "./session";
import { Outlet, Navigate } from "react-router-dom";

export function ProtectedRoute() {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

