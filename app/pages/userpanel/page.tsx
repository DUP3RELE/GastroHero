"use client";

import { useEffect } from "react";
import Workers from "@/app/components/datablocks/workers";
import MealData from "@/app/components/datablocks/restaurantData";
import RecipiesData from "@/app/components/datablocks/recipies";
import { useRouter } from "next/navigation";
import { useRestaurantName } from "@/app/api/hooks/useRestaurantName";
import { useAuth } from "@/app/api/hooks/useAuthToken";

interface RestaurantData {
	restaurantname: string;
}

export default function RestaurantProfile() {
	const { isAuthenticated } = useAuth();
	const router = useRouter();
	const token =
		typeof window !== "undefined"
			? window.localStorage.getItem("token")
			: false;

	const { restaurantName } = useRestaurantName(token || "");

	useEffect(() => {
		if (!isAuthenticated && !token) {
			router.push("pages/userpanel/login");
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
				<RecipiesData />
				<MealData />
				<MealData />
				<MealData />
			</div>
		</div>
	);
}
