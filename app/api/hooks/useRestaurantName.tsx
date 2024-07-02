import { useState, useEffect } from "react";
import { BASE_API_URL } from "../config/api";

interface RestaurantData {
	restaurantname: string;
	loading: boolean;
	error: string | null;
}

export const useRestaurantName = (token: string) => {
	const [restaurantName, setRestaurantName] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchRestaurantName = async () => {
			if (!token) {
				console.error("Brak tokenu, użytkownik niezalogowany");
				setError("Brak tokenu, użytkownik niezalogowany");
				setLoading(false);
				setRestaurantName("");
				return;
			}

			try {
				const response = await fetch(`${BASE_API_URL}/protected`, {
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
			} catch (error: any) {
				console.error(error.message);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchRestaurantName();
	}, [token]);

	return { restaurantName, loading, error };
};
