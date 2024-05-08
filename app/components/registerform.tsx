"use client";
import { useState, FormEvent } from "react";
import { useRegister } from "../api/register";

interface RegisterFormData {
	restaurantname: string;
	email: string;
	password: string;
}

interface Errors {
	restaurantname: string | null;
	email: string | null;
	password: string | null;
	general: string | null;
}

export default function RegisterForm() {
	const [formData, setFormData] = useState<RegisterFormData>({
		restaurantname: "",
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<Errors>({
		restaurantname: null,
		email: null,
		password: null,
		general: null,
	});

	const register = useRegister();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	function validateInput(
		restaurantname: string,
		email: string,
		password: string
	): Errors {
		return {
			restaurantname: !restaurantname ? "Wpisz nazwę restauracji." : null,
			email: !email
				? "Wpisz adres E-mail."
				: !/\S+@\S+\.\S+/.test(email)
				? "Adres E-mail jest niepoprawny."
				: null,
			password: !password
				? "Podaj hasło."
				: password.length < 6
				? "Hasło musi mieć conajmniej 6 znaków długości."
				: null,
			general: null,
		};
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const newErrors = validateInput(
			formData.restaurantname,
			formData.email,
			formData.password
		);
		setErrors(newErrors);
		if (newErrors.restaurantname || newErrors.email || newErrors.password) {
			return;
		}
		try {
			await register(
				formData.restaurantname,
				formData.email,
				formData.password
			);
		} catch (error: any) {
			setErrors((prev) => ({ ...prev, general: error.message }));
		}
	};

	const renderErrors = () => {
		const { general } = errors;
		return general ? <p className='text-red-500 text-xs'>{general}</p> : null;
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
				{errors.restaurantname && (
					<p className='text-red-500 text-xs'>{errors.restaurantname}</p>
				)}
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
				{errors.email && <p className='text-red-500 text-xs'>{errors.email}</p>}
				{renderErrors()}
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
				{errors.password && (
					<p className='text-red-500 text-xs'>{errors.password}</p>
				)}
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
