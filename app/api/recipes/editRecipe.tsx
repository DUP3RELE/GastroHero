import { BASE_API_URL } from "../config/api";

export interface RecipeEditData {
	title: string;
	content_ingredients: string;
	content_methods: string;
	employee_id: number;
}

export const editRecipe = async (
	formData: RecipeEditData,
	recipeId: number
) => {
	const token = localStorage.getItem("token");
	if (!token) {
		console.error("Brak tokenu JWT.");
		return;
	}

	try {
		const response = await fetch(
			`${BASE_API_URL}/edit_recipe/${recipeId}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(formData),
			}
		);

		if (!response.ok) {
			throw new Error("Nie udało się zaktualizować przepisu");
		}

		return await response.json();
	} catch (error) {
		console.error("Błąd przy edycji przepisu:", error);
		throw error;
	}
};
