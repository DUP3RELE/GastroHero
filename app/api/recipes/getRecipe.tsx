import { BASE_API_URL } from "../config/api";
import { useState, useCallback } from "react";

export interface Recipe {
	id: number;
	title: string;
	content_ingredients: string;
	content_methods: string;
	employee_id: number;
	date_added: number;
	editor_name: string;
}
export const getRecipes = (accessToken: string, restaurantId: number) => {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [error, setError] = useState<string | null>(null);

	const fetchRecipes = useCallback(async () => {
		if (!accessToken || !restaurantId) {
			setError("Brak tokenu lub ID restauracji");
			return;
		}

		try {
			const response = await fetch(
				`${BASE_API_URL}/get_recipes?restaurant_id=${restaurantId}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (response.ok) {
				const data: Recipe[] = await response.json();
				setRecipes(data);
			} else {
				const errMsg = await response.text();
				throw new Error(`Nie udało się pobrać przepisu: ${errMsg}`);
			}
		} catch (error: any) {
			console.error(error.message);
			setError(error.message);
		}
	}, [accessToken, restaurantId]);

	return { recipes, fetchRecipes, error };
};
