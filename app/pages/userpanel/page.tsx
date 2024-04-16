"use client";

import React, { useEffect } from "react";
import Workers from "@/app/components/datablocks/workers";
import MealData from "@/app/components/datablocks/restaurantData";
import { useRouter } from "next/navigation";
import { useRestaurantName } from "@/app/api/hooks/useRestaurantName";
import { useAuth } from "@/app/api/hooks/useAuthToken";

interface RestaurantData {
	restaurantname: string;
}

export default function RestaurantProfile() {
	const { isAuthenticated } = useAuth();
	const router = useRouter();
	const token = localStorage.getItem("token");

	const { restaurantName } = useRestaurantName(token || "");

	useEffect(() => {
		if (!isAuthenticated && !token) {
			router.push("/userpanel/login");
		}
	}, [isAuthenticated, token, router]);

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
