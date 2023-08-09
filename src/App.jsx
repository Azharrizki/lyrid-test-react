import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AuthRoute from "./components/AuthRoute";
import Error from "./pages/Error";
import User from "./pages/User";
import Employee from "./pages/Employee";

const App = () => {
	return (
		<Routes>
			<Route path="login" element={<Login />} />
			<Route path="register" element={<Register />} />
			<Route path="*" element={<Error />} />
			{/* private route */}
			<Route element={<AuthRoute />}>
				<Route path="" element={<Dashboard />} />
				<Route path="data-pegawai" element={<Employee />} />
				<Route path="data-user" element={<User />} />
			</Route>
		</Routes>
	);
};

export default App;
