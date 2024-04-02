"use client";
import React from "react";
import useAuthToken from "@/app/api/hooks/useAuthToken";
import UserProfile from "../../page";

const SomePage: React.FC = () => {
	const token = useAuthToken();

	return <div>{token ? <UserProfile /> : <p>Proszę się zalogować</p>}</div>;
};

export default SomePage;
