import { useState, useEffect } from "react";
import { BASE_API_URL } from "../config/api";

export const useRestaurantName = (token: string | null) => {
	const [restaurantName, setRestaurantName] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!token) {
			
			setError("Brak tokenu, użytkownik niezalogowany");
			setLoading(false);
			setRestaurantName("");
			return;
		}
		const fetchRestaurantName = async () => {
			try {
				const response = await fetch(`${BASE_API_URL}/protected`, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (response.ok) {
					const data = await response.json();
				
					setRestaurantName(data.restaurantname);
				} else {
					const errorText = await response.text();
					throw new Error("Nie udało się pobrać danych: " + errorText);
				}
			} catch (error: any) {
				
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchRestaurantName();
	}, [token]);

	return { restaurantName, loading, error };
};
