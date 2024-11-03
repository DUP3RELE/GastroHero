"use client";
import { useRestaurantName } from "@/app/api/hooks/useRestaurantName";
import { getRecipes } from "@/app/api/recipes/getRecipe";
import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { deleteRecipe } from "@/app/api/recipes/deleteRecipe";
import { editRecipe } from "@/app/api/recipes/editRecipe";
import Modal from "@/app/components/modal";
import { useEmployeeName } from "@/app/api/hooks/useEmployeeName";
import { useAuth } from "@/app/api/hooks/useAuthToken";

export default function Recipies() {
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
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newTitle, setNewTitle] = useState("");
	const [newContent_ingredients, setNewContent_ingredients] = useState("");
	const [newContent_methods, setNewContent_methods] = useState("");

	const { restaurantName } = useRestaurantName(token || "");
	const { employeeName } = useEmployeeName(token || "");
	const { userType } = useAuth();
	const initialRestaurantId = parseInt(
		localStorage.getItem("restaurant_id") || "0"
	);
	const initialEmployeeId = parseInt(
		localStorage.getItem("employee_id") || "0"
	);

	useEffect(() => {
		fetchRecipes();
	}, [fetchRecipes]);

	const handleOpen = (id: number) => {
		setOpenRecipeId(openRecipeId === id ? null : id);
	};

	const handleDelete = async (id: number) => {
		try {
			await deleteRecipe(id);
			setOpenRecipeId(null);
			fetchRecipes();
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const handleEdit = async (e: FormEvent, id: number) => {
		e.preventDefault();
		try {
			await editRecipe(
				{
					title: newTitle,
					content_ingredients: newContent_ingredients,
					content_methods: newContent_methods,
					restaurant_id: initialRestaurantId,
					employee_id: initialEmployeeId,
					editor_name: restaurantName || employeeName || "",
				},
				id
			);

			fetchRecipes();
			setIsModalOpen(false);
			setNewTitle("");
			setNewContent_ingredients("");
			setNewContent_methods("");
			console.log("Przepis edytowany!");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='w-full m-5'>
			<div className='flex justify-between w-full m-2'>
				<div>
					{userType == "restaurant" && restaurantName && (
						<h1 className='m-2'>Witaj, {restaurantName}</h1>
					)}
					{userType == "employee" && employeeName && (
						<h1 className='m-2'>Witaj, {employeeName}</h1>
					)}
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
									<strong>Pracownik:</strong> {recipe.editor_name}
								</p>
								<p>
									<strong>Data dodania:</strong>
									{new Date(recipe.date_added).toLocaleDateString()}
								</p>
								<div className='flex justify-end mt-4'>
									<button
										onClick={() => setIsModalOpen(true)}
										className='bg-yellow-500 text-white px-2 py-1 rounded mr-2'
									>
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
			{isModalOpen && (
				<Modal onClose={() => setIsModalOpen(false)}>
					<h2>Edytuj Recepturę</h2>
					<form onSubmit={(e) => handleEdit(e, openRecipeId!)}>
						<div className='w-full'>
							<div className='flex flex-col'>
								<label htmlFor='new-position-name'>Nazwa Receptury:</label>
								<input
									type='text'
									id='new-position-name'
									value={newTitle}
									onChange={(e) => setNewTitle(e.target.value)}
									className='border p-2 rounded'
								/>
							</div>
							<div className='flex flex-col'>
								<label htmlFor='new-position-ingridients'>Składniki:</label>
								<textarea
									id='new-position-ingridients'
									value={newContent_ingredients}
									onChange={(e) => setNewContent_ingredients(e.target.value)}
									className='border p-2 rounded resize-none'
								/>
							</div>
							<div className='flex flex-col'>
								<label htmlFor='new-position-methods'>Techniki:</label>
								<textarea
									id='new-position-methods'
									value={newContent_methods}
									onChange={(e) => setNewContent_methods(e.target.value)}
									className='border p-2 rounded resize-none'
								/>
							</div>
						</div>
						<div className='m-2'>
							<button
								type='submit'
								className='bg-green-500 text-white px-4 m-2 py-2 rounded'
							>
								Zapisz zmiany
							</button>
							<button
								type='button'
								onClick={() => setIsModalOpen(false)}
								className='bg-red-500 text-white px-4 m-2 py-2 rounded'
							>
								Anuluj
							</button>
						</div>
					</form>
				</Modal>
			)}
		</div>
	);
}
