"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GetEmployees } from "@/app/api/getEmployees";
import { useRestaurantName } from "@/app/api/hooks/useRestaurantName";
import editEmployee from "@/app/api/editEmployee";
import deleteEmployee from "@/app/api/deleteEmployee";
import PositionSelect from "@/app/components/positionSelect";

interface EmployeeFormData {
	restaurant_id: number;
	login: string;
	password: string;
	name: string;
	position: string;
}

export default function EmployeeManagement() {
	const token = localStorage.getItem("token");
	const restaurantId = localStorage.getItem("restaurant_id");
	const [expandedId, setExpandedId] = useState(null);
	const [editPosition, setEditPosition] = useState("");

	const { restaurantName } = useRestaurantName(token || "");

	const { employees, fetchEmployees, error } = GetEmployees(
		token!,
		parseInt(restaurantId!)
	);

	useEffect(() => {
		fetchEmployees();
	}, [fetchEmployees]);

	const toggleExpand = (id: any) => {
		if (expandedId === id) {
			setExpandedId(null);
		} else {
			setExpandedId(id);
		}
	};

	const handleEdit = async (employeeId: number, newPosition: string) => {
		try {
			const updatedData = { position: newPosition };
			await editEmployee(employeeId, updatedData);
			fetchEmployees();
		} catch (error) {
			console.error("Error editing employee:", error);
		}
	};

	const handleDelete = async (employeeId: any) => {
		try {
			await deleteEmployee(employeeId);
			fetchEmployees();
		} catch (error) {
			console.error("Error deleting employee:", error);
		}
	};

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
						<div>
							{employees.map((employee) => (
								<div
									className='border rounded-md m-1 p-4 flex flex-col justify-between'
									key={employee.id}
								>
									<div className='flex justify-between'>
										<div>
											{employee.name} - {employee.position}
										</div>
										<button
											onClick={() => toggleExpand(employee.id)}
											className='border rounded-md p-2 pt-1 shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-indigo-900 dark:hover:bg-indigo-800 dark:text-white dark:focus:ring-indigo-400 dark:focus:border-indigo-400 cursor-pointer'
										>
											...
										</button>
									</div>
									{expandedId === employee.id && (
										<div
											className='text-sm p-2 mt-2 bg-gray-400 rounded-md'
											style={{ maxHeight: "33vh", overflowY: "auto" }}
										>
											<PositionSelect
												value={editPosition}
												onChange={(e) => setEditPosition(e.target.value)}
											/>
											<button
												onClick={() => {
													handleEdit(employee.id, editPosition);
													setExpandedId(null);
												}}
												className='p-2 text-left border rounded-md m-2'
											>
												Zapisz zmiany
											</button>
											<button
												onClick={() => handleDelete(employee.id)}
												className='p-2 text-left border rounded-md m-2'
											>
												Usuń
											</button>
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
