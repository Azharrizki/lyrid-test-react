import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [auth, setAuth] = useState(false);
	const [role, setRole] = useState(null);

	const getSession = async () => {
		const { data, error } = await supabase.auth.getSession();

		if (error) console.log("terjadi error ketika mengambil session", error);

		if (data.session === null) {
			console.log("Data session tidak tersedia");
		} else if (data) {
			console.log("berhasil melakukan login");
		}
	};

	useEffect(() => {
		getSession();
	}, []);

	return (
		<AuthContext.Provider
			value={{ user, auth, role, setAuth, setUser, setRole }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
