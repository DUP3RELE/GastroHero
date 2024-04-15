import React, { useEffect, useState } from "react";
import Link from "next/link";
import { GetEmployees } from "@/app/api/getEmployees";

export default function Workers() {
	const token = localStorage.getItem("token");
	const restaurantId = localStorage.getItem("restaurant_id");
	const { employees, fetchEmployees, error } = GetEmployees(
		token!,
		parseInt(restaurantId!)
	);

	useEffect(() => {
		fetchEmployees();
	}, [fetchEmployees]);

	return (
		<div className='w-1/4 m-3 p-3 rounded border shadow-lg dark:shadow-blue-800 shadow-blue-300'>
			<div className='m-3'>
				<p>Pracownicy</p>
				{error && <p className='text-red-500'>{error}</p>}
			</div>
			<div className='m-2'>
				<ul>
					{employees.slice(0, 5).map((employee) => (
						<li key={employee.id}>
							{employee.name} - {employee.position}
						</li>
					))}
				</ul>
				<Link
					href='/pages/userpanel/employeeManagement'
					className='hover:underline-offset-4'
				>
					...
				</Link>
			</div>
		</div>
	);
}
