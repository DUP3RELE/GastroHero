"use client";

import React, { useState, useEffect } from "react";
import Workers from "@/app/components/datablocks/workers";
import MealData from "@/app/components/datablocks/restaurantData";
import { useRouter } from "next/navigation";

interface UserData {
	username: string;
}

export default function UserProfile() {
	const [username, setUsername] = useState<string>("");
	const router = useRouter();

	useEffect(() => {
		const fetchUsername = async () => {
			const token = localStorage.getItem("token");
			if (!token) {
				console.error("Brak tokenu, użytkownik niezalogowany");
				return;
			}

			try {
				const response = await fetch("http://127.0.0.1:5000/api/protected", {
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (response.ok) {
					const data: UserData = await response.json();
					setUsername(data.username);
				} else {
					throw new Error("Nie udało się pobrać danych");
				}
			} catch (error) {
				console.error(error);
			}
		};
		fetchUsername();
	}, []);

	return (
		<div className='m-2'>
			<div className='m-5'>
				{username ? (
					<h1>Witaj, {username}!</h1>
				) : (
					<h1>Ładowanie danych użytkownika...</h1>
				)}
			</div>
			<div className='flex w-screen flex-wrap'>
				<Workers />
				<MealData />
				<MealData />
				<MealData />
				<MealData />
			</div>
		</div>
	);
}
