"use client";
import Link from "next/link";
import { useEffect } from "react";
import { GetEmployees } from "@/app/api/getEmployees";
import { useRestaurantName } from "@/app/api/hooks/useRestaurantName";
// import { CogIcon } from "@/app/img/icons/gear-solid.svg";

export default function employeeManagement() {
	const token = localStorage.getItem("token");
	const restaurantId = localStorage.getItem("restaurant_id");
	const { employees, fetchEmployees, error } = GetEmployees(
		token!,
		parseInt(restaurantId!)
	);
	const { restaurantName } = token
		? useRestaurantName(token)
		: { restaurantName: "" };

	useEffect(() => {
		fetchEmployees();
	}, [fetchEmployees]);

	return (
		<>
			<div className='w-full m-2'>
				<div className='flex justify-between w-full m-2'>
					<div className='m-2'>
						{restaurantName ? (
							<h1>Witaj, {restaurantName}</h1>
						) : (
							<h1>Ładowanie danych użytkownika...</h1>
						)}
					</div>
					<div className='m-2'>
						<Link
							href={"./employeeManagement/registerEmployee"}
							className='m-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-indigo-900 dark:hover:bg-indigo-800 dark:text-white dark:focus:ring-indigo-400 dark:focus:border-indigo-400'
						>
							Zarejestruj pracownika
						</Link>
						<Link
							href={""}
							className='m-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-indigo-900 dark:hover:bg-indigo-800 dark:text-white dark:focus:ring-indigo-400 dark:focus:border-indigo-400'
						>
							Edytuj pozycje
						</Link>
					</div>
				</div>
				<div className=''>
					<div className='m-3'>
						<p>Pracownicy:</p>
						{error && <p className='text-red-500'>{error}</p>}
					</div>
					<div className='m-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 dark:border-gray-600 dark:bg-indigo-900 dark:text-white'>
						<ul>
							{employees.map((employee) => (
								<div
									className='border rounded-md m-2 p-4 flex justify-between'
									key={employee.id}
								>
									<div>
										{employee.name} - {employee.position}
									</div>
									<div>
										<p>opcje tutaj cog icon</p>
									</div>
								</div>
							))}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}
