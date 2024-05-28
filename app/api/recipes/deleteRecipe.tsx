export const deleteRecipe = async (recipeId: number) => {
	const token = localStorage.getItem("token");
	if (!token) {
		console.error("Brak tokenu");
	}

	try {
		const response = await fetch(
			`http://127.0.0.1:5000/api/delete_recipe/${recipeId}`,
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

