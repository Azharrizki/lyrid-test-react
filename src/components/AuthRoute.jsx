import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
	const { user } = useAuth();

	return user ? (
		<Outlet />
	) : (
		<Navigate to={"/login"} replace state={{ path: location.pathname }} />
	);
};

export default AuthRoute;
