"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
	isAuthenticated: boolean;
	userType: string | null;
	loginAction: (userType: string) => void;
	logoutAction: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userType, setUserType] = useState<string | null>(null);

	const loginAction = (type: string) => {
		setIsAuthenticated(true);
		setUserType(type);
	};

	const logoutAction = () => {
		setIsAuthenticated(false);
		setUserType(null);
		localStorage.removeItem("token");
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, userType, loginAction, logoutAction }}
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
