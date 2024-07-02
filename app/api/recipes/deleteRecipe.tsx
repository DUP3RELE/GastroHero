import { BASE_API_URL } from "../config/api";

export const deleteRecipe = async (recipeId: number) => {
	const token = localStorage.getItem("token");
	if (!token) {
		console.error("Brak tokenu");
	}

	try {
		const response = await fetch(
			`${BASE_API_URL}/delete_recipe/${recipeId}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);
		if (!response.ok) {
			throw new Error("Nie udało się usunąć przepisu");
		}
		return await response.json();
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};

