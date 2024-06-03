"use client";
import { useState, FormEvent } from "react";
import { createRecipe } from "@/app/api/recipes/createRecipe";
import { RecipeFormData } from "@/app/api/recipes/createRecipe";
import { useRouter } from "next/navigation";

interface Errors {
	title: string;
	content_ingredients: string;
	content_methods: string;
}

export default function recipiesCreate() {
	const initialRestaurantId = parseInt(
		localStorage.getItem("restaurant_id") || "0"
	);
	const router = useRouter();
	const [formData, setFormData] = useState<RecipeFormData>({
		restaurant_id: initialRestaurantId,
		employee_id: 1,
		title: "",
		content_ingredients: "",
		content_methods: "",
	});
	// const [errors, setErrors] = useState<Errors>({
	// 	title: "",
	// 	content_ingredients: "",
	// 	content_methods: "",
	// });

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await createRecipe(formData);
			console.log("Przepis stworzony!");
			router.push("./");
		} catch (error) {
			console.error(error);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

	return (
		<>
			<div className='w-full m-5'>
				<div>
					<p className='m-2 text-xl font-bold text-center'>Stwórz przepis:</p>
					<form
						onSubmit={handleSubmit}
						className='m-1'
					>
						<div>
							<label
								className='mt-1 block w-full px-3 py-2'
								htmlFor='title'
							>
								Tytuł:
							</label>
							<input
								type='text'
								id='title'
								name='title'
								value={formData.title}
								onChange={handleChange}
								className='mt-1 block w-25 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-indigo-400 dark:focus:border-indigo-400'
							/>
						</div>
						<div>
							<label
								className='mt-1 block w-full px-3 py-2'
								htmlFor='description'
							>
								Składniki:
							</label>
							<textarea
								id='content_ingredients'
								name='content_ingredients'
								value={formData.content_ingredients}
								onChange={handleChange}
								className='mt-1 block w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-indigo-400 dark:focus:border-indigo-400 resize-none'
							/>
						</div>
						<div>
							<label
								className='mt-1 block w-full px-3 py-2'
								htmlFor='ingredients'
							>
								Techniki:
							</label>
							<textarea
								id='content_methods'
								name='content_methods'
								value={formData.content_methods}
								onChange={handleChange}
								className='mt-1 block w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-indigo-400 dark:focus:border-indigo-400 resize-none'
							/>
						</div>

						<button
							type='submit'
							className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-indigo-900 dark:hover:bg-indigo-800 dark:text-white dark:focus:ring-indigo-400 dark:focus:border-indigo-400 mt-5'
						>
							Stwórz przepis
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
