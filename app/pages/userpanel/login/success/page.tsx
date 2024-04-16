"use client";
import React from "react";
import { useAuth } from "@/app/api/hooks/useAuthToken";
import UserProfile from "../../page";

const SomePage: React.FC = () => {
	const token = useAuth();

	return <div>{token ? <UserProfile /> : <p>Proszę się zalogować</p>}</div>;
};

export default SomePage;
