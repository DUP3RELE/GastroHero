"use client";
import { useState, FormEvent } from "react";
import { useRegister } from "../api/register";

interface RegisterFormData {
	restaurantname: string;
	email: string;
	password: string;
}


export default function RegisterForm() {
	const [formData, setFormData] = useState<RegisterFormData>({
		restaurantname: "",
		email: "",
		password: "",
	});

	const register = useRegister();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		await register(formData.restaurantname, formData.email, formData.password);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-4'
		>
			<div>
				<label
					htmlFor='restaurantname'
					className='block text-sm font-medium text-gray-700 dark:text-gray-200'
				>
					Nazwa Restauracji
				</label>
				<input
					type='text'
					name='restaurantname'
					value={formData.restaurantname}
					onChange={handleChange}
					className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-indigo-400 dark:focus:border-indigo-400'
				/>
			</div>
			<div>
				<label
					htmlFor='email'
					className='block text-sm font-medium text-gray-700 dark:text-gray-200'
				>
					Email
				</label>
				<input
					type='email'
					name='email'
					value={formData.email}
					onChange={handleChange}
					className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-indigo-400 dark:focus:border-indigo-400'
				/>
			</div>
			<div>
				<label
					htmlFor='password'
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
			</div>
			<button
				type='submit'
				className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-indigo-900 dark:text-white dark:focus:ring-indigo-400 dark:focus:border-indigo-400'
			>
				Zarejestruj się
			</button>
		</form>
	);
}
