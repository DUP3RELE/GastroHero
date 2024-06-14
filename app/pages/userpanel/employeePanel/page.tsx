"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/api/hooks/useAuthToken";

export default function employeePanel() {
	const [employee, setEmployee] = useState<Employee | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [editMode, setEditMode] = useState(false);
	const [newPassword, setNewPassword] = useState("");
	const router = useRouter();
	const { getToken } = useAuth();

	useEffect(() => {
		const fetchEmployeeData = async () => {
			try {
				const token = getToken();
				const response = await fetch("http://127.0.0.1:5000/api/employee/me", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (response.ok) {
					const data: Employee = await response.json();
					setEmployee(data);
				} else {
					throw new Error("Failed to fetch employee data.");
				}
			} catch (error: any) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchEmployeeData();
	}, []);

	const handleSaveChanges = async () => {
		try {
			const token = getToken();
			const response = await fetch(
				"http://127.0.0.1:5000/api/employee/update",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(employee),
				}
			);

			if (response.ok) {
				setEditMode(false);
			} else {
				throw new Error("Failed to update employee data.");
			}
		} catch (error: any) {
			setError(error.message);
		}
	};

	const handleChangePassword = async () => {
		try {
			const token = getToken();
			const response = await fetch(
				"http://127.0.0.1:5000/api/employee/change-password",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ newPassword }),
				}
			);

			if (response.ok) {
				setNewPassword("");
				alert("Password changed successfully.");
			} else {
				throw new Error("Failed to change password.");
			}
		} catch (error: any) {
			setError(error.message);
		}
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p className='text-red-500'>Error: {error}</p>;

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-4'>Employee Panel</h1>
			{employee && (
				<div>
					<div className='mb-4'>
						<label className='block text-sm font-medium text-gray-700'>
							Name
						</label>
						<input
							type='text'
							value={employee.name}
							onChange={(e) =>
								setEmployee({ ...employee, name: e.target.value })
							}
							disabled={!editMode}
							className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
						/>
					</div>
					<div className='mb-4'>
						<label className='block text-sm font-medium text-gray-700'>
							Position
						</label>
						<input
							type='text'
							value={employee.position}
							onChange={(e) =>
								setEmployee({ ...employee, position: e.target.value })
							}
							disabled={!editMode}
							className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
						/>
					</div>
					{editMode ? (
						<button
							onClick={handleSaveChanges}
							className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
						>
							Save Changes
						</button>
					) : (
						<button
							onClick={() => setEditMode(true)}
							className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
						>
							Edit
						</button>
					)}
					<div className='mt-6'>
						<h2 className='text-xl font-bold mb-2'>Change Password</h2>
						<input
							type='password'
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
						/>
						<button
							onClick={handleChangePassword}
							className='w-full flex justify-center py-2 px-4 mt-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
						>
							Change Password
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
