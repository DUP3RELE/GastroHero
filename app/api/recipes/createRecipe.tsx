import { BASE_API_URL } from "../config/api";

export interface RecipeFormData {
	restaurant_id: number;
	title: string;
	content_ingredients: string;
	content_methods: string;
	employee_id: number;
}

export const createRecipe = async (formData: RecipeFormData) => {
	const token = localStorage.getItem("token");
	if (!token) {
		console.error("No JWT token is stored.");
	}

	try {
		const response = await fetch(`${BASE_API_URL}/create_recipe`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(formData),
		});
		if (!response.ok) {
			throw new Error("Nie udało się zapisać przepisu");
		}
		return await response.json();
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};
