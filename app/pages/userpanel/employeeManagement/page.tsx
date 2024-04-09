import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/api/hooks/useAuthToken";
import RestaurantProfile from "../page";

interface RestaurantData {
	restaurantname: string;
}

export default function employeeManagement() {
	const [restaurantName, setRestaurantName] = useState<string>("");
	const { isAuthenticated, logout } = useAuth();
	const router = useRouter();
	useEffect(() => {
		const fetchRestaurantName = async () => {
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
					const data: RestaurantData = await response.json();
					setRestaurantName(data.restaurantname);
				} else {
					throw new Error("Nie udało się pobrać danych");
				}
			} catch (error) {
				console.error(error);
			}
		};
		const token = localStorage.getItem("token");
		if (token) {
			fetchRestaurantName();
		} else {
			setRestaurantName("");
		}
	}, [isAuthenticated]);

	return (
		<>
			<div className='flex justify-between w-full m-2'>
				<div className='m-2'>
					{restaurantName ? (
						<h1>Witaj, {restaurantName}!</h1>
					) : (
						<h1>Ładowanie danych użytkownika...</h1>
					)}
				</div>
				<div className='m-2'>
					<Link
						href={"./employeeManagement/registerEmployee"}
						className='m-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-indigo-900 dark:hover:bg-indigo-800 dark:text-white dark:focus:ring-indigo-400 dark:focus:border-indigo-400'
					>
						Zarejestruj pracownika
					</Link>
					<Link
						href={""}
						className='m-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-indigo-900 dark:hover:bg-indigo-800 dark:text-white dark:focus:ring-indigo-400 dark:focus:border-indigo-400'
					>
						Edytuj pozycje
					</Link>
				</div>
			</div>
		</>
	);
}
