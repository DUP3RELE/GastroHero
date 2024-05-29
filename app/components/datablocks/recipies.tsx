"use client";
import { getRecipes } from "@/app/api/recipes/getRecipe";
import { useEffect } from "react";
import Link from "next/link";

export default function RecipiesData() {
	const token = localStorage.getItem("token");
	const restaurantId = localStorage.getItem("restaurant_id");
	const { recipes, fetchRecipes, error } = getRecipes(
		token!,
		parseInt(restaurantId!)
	);

	useEffect(() => {
		fetchRecipes();
	}, [fetchRecipes]);

	return (
		<>
			<div className='w-1/4 m-3 p-3 rounded border shadow-lg dark:shadow-blue-800 shadow-blue-300'>
				<div className='m-3'>
					<p>Lista Receptur</p>
					{error && <p className='text-red-500'>{error}</p>}
				</div>
				<div className='m-2'>
					<ul>
						{recipes.slice(0, 5).map((recipe) => (
							<li key={recipe.id}>
								{recipe.title}
							</li>
						))}
					</ul>
					<Link
						href='/pages/recipes'
						className='hover:underline-offset-4'
					>
						...
					</Link>
				</div>
			</div>
		</>
	);
}
