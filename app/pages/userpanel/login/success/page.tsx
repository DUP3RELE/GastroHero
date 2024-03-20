'use client'
import React from "react";
import useAuthToken from "@/app/api/hooks/useAuthToken";
import UserProfile from "@/app/components/userInterface";

const SomePage: React.FC = () => {
	const token = useAuthToken();

	return <div>{token ? <UserProfile /> : <p>Proszę się zalogować</p>}</div>;
};

export default SomePage;
