"use client";
import { useState, FormEvent } from "react";
import createEmployee from "../api/createEmployee";
import { EmployeeFormData } from "../api/createEmployee";
import { useRouter } from "next/navigation";

export default function CreateEmployeeForm() {
	const initialRestaurantId = localStorage.getItem("restaurant_id") || "";
	const router = useRouter();

	const [formData, setFormData] = useState<EmployeeFormData>({
		login: "",
		password: "",
		name: "",
		position: "",
		restaurant_id: initialRestaurantId,
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			await createEmployee(formData);
			console.log("Employee registered successfully");
			router.push("../");
		} catch (error) {
			console.error("Failed to register employee");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-4 m-4'
		>
			<label
				htmlFor='login'
				className='block text-sm font-medium text-gray-700 dark:text-gray-200'
			>
				Login
			</label>
			<input
				type='login'
				name='login'
				value={formData.login}
				onChange={handleChange}
				className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-indigo-400 dark:focus:border-indigo-400'
			/>
			<label
				htmlFor='login'
				className='block text-sm font-medium text-gray-700 dark:text-gray-200'
			>
				Hasło
			</label>
			<input
				type='password'
				name='password'
				value={formData.password}
				onChange={handleChange}
				className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-indigo-400 dark:focus:border-indigo-400'
			/>
			<label
				htmlFor='name'
				className='block text-sm font-medium text-gray-700 dark:text-gray-200'
			>
				Imię i Nazwisko
			</label>
			<input
				type='name'
				name='name'
				value={formData.name}
				onChange={handleChange}
				className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-indigo-400 dark:focus:border-indigo-400'
			/>
			<label
				htmlFor='position'
				className='block text-sm font-medium text-gray-700 dark:text-gray-200'
			>
				Pozycja
			</label>
			<select
				name='position'
				value={formData.position}
				onChange={handleChange}
				className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-indigo-400 dark:focus:border-indigo-400'
			>
				<option value=''>Wybierz opcję</option>
				<option value='opcja1'>Opcja 1</option>
				<option value='opcja2'>Opcja 2</option>
				<option value='opcja3'>Opcja 3</option>
			</select>
			<button
				type='submit'
				className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-indigo-900 dark:hover:bg-indigo-800 dark:text-white dark:focus:ring-indigo-400 dark:focus:border-indigo-400'
			>
				Stwórz konto pracownika
			</button>
		</form>
	);
}
