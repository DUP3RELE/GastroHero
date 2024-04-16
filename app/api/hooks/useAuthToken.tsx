"use client";
import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";

interface AuthContextType {
	isAuthenticated: boolean;
	loginAction: () => void;
	logoutAction: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const loginAction = () => setIsAuthenticated(true);
	const logoutAction = () => {
		setIsAuthenticated(false);
		localStorage.removeItem("token");
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, loginAction, logoutAction }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
