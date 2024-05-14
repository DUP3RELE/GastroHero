"use client";
import { useState, FormEvent } from "react";
import createEmployee from "../api/employees/createEmployee";
import { EmployeeFormData } from "../api/employees/createEmployee";
import { useRouter } from "next/navigation";
import PositionSelect from "./positionSelect";

interface Errors {
	login: string | null;
	password: string | null;
	name: string | null;
	position: string | null;
	general: string | null;
}

export default function CreateEmployeeForm() {
	const initialRestaurantId = parseInt(
		localStorage.getItem("restaurant_id") || "0"
	);
	const router = useRouter();

	const [formData, setFormData] = useState<EmployeeFormData>({
		login: "",
		password: "",
		name: "",
		position: "",
		restaurant_id: initialRestaurantId,
	});
	const [errors, setErrors] = useState<Errors>({
		login: null,
		password: null,
		general: null,
		name: null,
		position: null,
	});

	function validateInput(
		login: string,
		password: string,
		name: string,
		position: string
	): Errors {
		return {
			login: !login
				? "Wpisz login."
				: login.length < 4
				? "Login jest za krótki."
				: null,
			password: !password
				? "Podaj hasło."
				: password.length < 6
				? "Hasło musi mieć conajmniej 6 znaków długości."
				: null,
			position: !position ? "Wybierz Pozycję" : null,
			name: !name
				? "Podaj Imię pracownika"
				: name.length < 3
				? "Imię jest za krótkie"
				: null,
			general: null,
		};
	}

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
		const errors = validateInput(
			formData.login,
			formData.password,
			formData.name,
			formData.position
		);
		setErrors(errors);
		if (errors.login || errors.password || errors.name || errors.position) {
			return;
		}
		try {
			await createEmployee(formData);
			console.log("Employee registered successfully");
			router.push("../");
		} catch (error) {
			console.error("Failed to register employee");
		}
	};

	const renderErrors = () => {
		const { general } = errors;
		return general ? <p className='text-red-500 text-xs'>{general}</p> : null;
	};

	const handlePositionChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setFormData({
			...formData,
			position: event.target.value,
		});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='m-1'
		>
			<label
				htmlFor='login'
				className='block text-sm font-medium text-gray-700 dark:text-gray-200 m-2'
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
			{errors.login && <p className='text-red-500 text-xs'>{errors.login}</p>}
			<label
				htmlFor='password'
				className='block text-sm font-medium text-gray-700 dark:text-gray-200 m-2'
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
			<label
				htmlFor='name'
				className='block text-sm font-medium text-gray-700 dark:text-gray-200 m-2'
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
			{errors.name && <p className='text-red-500 text-xs'>{errors.name}</p>}
			<label
				htmlFor='position'
				className='block text-sm font-medium text-gray-700 dark:text-gray-200 m-2'
			>
				Pozycja
			</label>
			<PositionSelect
				value={formData.position}
				onChange={handlePositionChange}
			/>
			{errors.position && (
				<p className='text-red-500 text-xs'>{errors.position}</p>
			)}
			<button
				type='submit'
				className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-indigo-900 dark:hover:bg-indigo-800 dark:text-white dark:focus:ring-indigo-400 dark:focus:border-indigo-400 mt-2'
			>
				Stwórz konto pracownika
			</button>
		</form>
	);
}
