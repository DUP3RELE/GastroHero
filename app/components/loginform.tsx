"use client";
import { useState, FormEvent } from "react";
import { useLogin } from "../api/login";

interface LoginFormData {
	email: string;
	password: string;
}

interface Errors {
	email: string | null;
	password: string | null;
	general: string | null;
}

export default function LoginForm() {
	const [formData, setFormData] = useState<LoginFormData>({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<Errors>({
		email: null,
		password: null,
		general: null,
	});

	const login = useLogin();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	function validateInput(email: string, password: string): Errors {
		return {
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
		const errors = validateInput(formData.email, formData.password);
		setErrors(errors);
		if (errors.email || errors.password) {
			return;
		}
		try {
			await login(formData.email, formData.password);
		} catch (error: any) {
			setErrors(error.message);
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
			{errors.email && <p className='text-red-500 text-xs'>{errors.email}</p>}
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
			{errors.password && (
				<p className='text-red-500 text-xs'>{errors.password}</p>
			)}
			{renderErrors()}
			<button
				type='submit'
				className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-indigo-900 dark:hover:bg-indigo-800 dark:text-white dark:focus:ring-indigo-400 dark:focus:border-indigo-400'
			>
				Zaloguj się
			</button>
		</form>
	);
}
