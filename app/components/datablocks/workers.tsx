"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface Employee {
	id: number;
	name: string;
	position: string;
}

export default function Workers() {
	const [employees, setEmployees] = useState<Employee[]>([]);

	useEffect(() => {
		const fetchEmployees = async () => {
			const token = localStorage.getItem("token");
			const restaurantId = localStorage.getItem("restaurant_id");
			if (!token) {
				console.error("Brak tokenu, użytkownik niezalogowany");
				return;
			}
			if (!restaurantId) {
				console.error("Brak id restauracji, użytkownik niezalogowany");
				return;
			}

			try {
				const response = await fetch(
					`http://127.0.0.1:5000/api/employees?restaurant_id=${restaurantId}`,
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
					}
				);

				if (response.ok) {
					const employees: Employee[] = await response.json();
					setEmployees(employees);
				} else {
					throw new Error("Nie udało się pobrać danych pracowników");
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchEmployees();
	}, []);

	return (
		<div className='w-1/4 m-3 p-3 rounded border shadow-lg dark:shadow-blue-800 shadow-blue-300'>
			<div className='m-3'>
				<p>Pracownicy</p>
			</div>
			<div className='m-2'>
				<ul>
					{employees.map((employee) => (
						<li key={employee.id}>
							{employee.name} - {employee.position}
						</li>
					))}
				</ul>
				<Link
					href={"/pages/userpanel/employeeManagement"}
					className='hover:underline-offset-4'
				>
					...
				</Link>
			</div>
		</div>
	);
}
