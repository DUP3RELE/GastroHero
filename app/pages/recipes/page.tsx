"use client";
import { useRestaurantName } from "@/app/api/hooks/useRestaurantName";
import { getRecipes } from "@/app/api/recipes/getRecipe";
import { useEffect } from "react";
import Link from "next/link";

export default function recipies() {
	const token = String(
		typeof window !== "undefined" ? window.localStorage.getItem("token") : false
	);
	const restaurantId = String(
		typeof window !== "undefined"
			? window.localStorage.getItem("restaurant_id")
			: false
	);

	const { restaurantName } = useRestaurantName(token || "");
	const { recipes, fetchRecipes, error } = getRecipes(
		token!,
		parseInt(restaurantId!)
	);

	useEffect(() => {
		fetchRecipes();
	}, [fetchRecipes]);
	return (
		<>
			<div className='flex justify-between w-full m-2'>
				<div>
					{restaurantName ? (
						<h1 className='m-2'>Witaj, {restaurantName}</h1>
					) : (
						<h1 className='m-2'>Ładowanie danych użytkownika...</h1>
					)}
					<h2 className='m-2'>Receptury:</h2>
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
			<div>
				{recipes.map((recipe) => (
					<div
						className='border rounded-md m-1 p-4 flex flex-col justify-between'
						key={recipe.id}
					>
						<div className='flex justify-between'>
							<div>{recipe.title}</div>
							<button>Otwórz</button>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
