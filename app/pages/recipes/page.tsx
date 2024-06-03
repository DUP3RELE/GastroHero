"use client";
import { useRestaurantName } from "@/app/api/hooks/useRestaurantName";
import { getRecipes } from "@/app/api/recipes/getRecipe";
import { useEffect, useState } from "react";
import Link from "next/link";
import { deleteRecipe } from "@/app/api/recipes/deleteRecipe";
import { Recipe } from "@/app/api/recipes/getRecipe";

export default function recipies() {
	const token = String(
		typeof window !== "undefined" ? window.localStorage.getItem("token") : false
	);
	const restaurantId = String(
		typeof window !== "undefined"
			? window.localStorage.getItem("restaurant_id")
			: false
	);
	const { recipes, fetchRecipes, error } = getRecipes(
		token!,
		parseInt(restaurantId!)
	);
	const [openRecipeId, setOpenRecipeId] = useState<number | null>(null);

	const { restaurantName } = useRestaurantName(token || "");

	useEffect(() => {
		fetchRecipes();
	}, [fetchRecipes]);

	const handleOpen = (id: any) => {
		setOpenRecipeId(openRecipeId === id ? null : id);
	};

	const handleDelete = async (id: any) => {
		try {
			await deleteRecipe(id);
			setOpenRecipeId(null);
			fetchRecipes();
		} catch (error) {
			console.error("Error:", error);
		}
	};
	return (
		<div className='w-full m-5'>
			<div className='flex justify-between w-full m-2'>
				<div>
					{restaurantName ? (
						<h1 className='m-2'>Witaj, {restaurantName}</h1>
					) : (
						<h1 className='m-2'>Ładowanie danych użytkownika...</h1>
					)}
					{error && <p className='text-red-500'>{error}</p>}
				</div>
				<div className='m-2'>
					<Link
						href={"./recipes/createRecipe"}
						className='m-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-indigo-900 dark:hover:bg-indigo-800 dark:text-white dark:focus:ring-indigo-400 dark:focus:border-indigo-400'
					>
						Dodaj Recepturę
					</Link>
					<Link
						href={"./recipes/editRecipe"}
						className='m-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-indigo-900 dark:hover:bg-indigo-800 dark:text-white dark:focus:ring-indigo-400 dark:focus:border-indigo-400'
					>
						Edytuj recepturę
					</Link>
				</div>
			</div>
			<h2 className='m-2'>Receptury:</h2>
			<div className=''>
				{recipes.map((recipe) => (
					<div
						className={`border rounded-md m-1 p-4 flex flex-col justify-between transition-all duration-300 ${
							openRecipeId === recipe.id ? "h-auto" : "h-20"
						}`}
						key={recipe.id}
					>
						<div className='flex justify-between'>
							<div>{recipe.title}</div>
							<button
								onClick={() => handleOpen(recipe.id)}
								className='bg-blue-500 text-white px-2 py-1 rounded'
							>
								{openRecipeId === recipe.id ? "Zamknij" : "Otwórz"}
							</button>
						</div>
						{openRecipeId === recipe.id && (
							<div className='mt-4'>
								<p>
									<strong>Składniki:</strong> {recipe.content_ingredients}
								</p>
								<p>
									<strong>Techniki:</strong> {recipe.content_methods}
								</p>
								<p>
									<strong>Pracownik:</strong> {recipe.employee_id}
								</p>
								<p>
									<strong>Data dodania:</strong>{" "}
									{new Date(recipe.date_added).toLocaleDateString()}
								</p>
								<div className='flex justify-end mt-4'>
									<button className='bg-yellow-500 text-white px-2 py-1 rounded mr-2'>
										Edytuj przepis
									</button>
									<button
										onClick={() => handleDelete(recipe.id)}
										className='bg-red-500 text-white px-2 py-1 rounded'
									>
										Usuń przepis
									</button>
								</div>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
