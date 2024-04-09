"use client";

import React, { useState, useEffect } from "react";
import Workers from "@/app/components/datablocks/workers";
import MealData from "@/app/components/datablocks/restaurantData";
import { useRouter } from "next/navigation";

interface RestaurantData {
	restaurantname: string;
}

export default function RestaurantProfile() {
	const [restaurantName, setRestaurantName] = useState<string>("");
	const router = useRouter();

	useEffect(() => {
		const fetchRestaurantData = async () => {
			const token = localStorage.getItem("token");
			if (!token) {
				console.error("Brak tokenu, użytkownik niezalogowany");
				router.push("/login");
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
					const data: RestaurantData = await response.json();
					setRestaurantName(data.restaurantname);
				} else {
					throw new Error("Nie udało się pobrać danych restauracji");
				}
			} catch (error) {
				console.error(error);
				router.push("/login");
			}
		};
		fetchRestaurantData();
	}, [router]);

	return (
		<div className='m-2'>
			<div className='m-5'>
				{restaurantName ? (
					<h1>Witaj, {restaurantName}!</h1>
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
