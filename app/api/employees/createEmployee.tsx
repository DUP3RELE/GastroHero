import { BASE_API_URL } from "../config/api";

export interface EmployeeFormData {
	restaurant_id: number;
	login: string;
	password: string;
	name: string;
	position: string;
}

const createEmployee = async (formData: EmployeeFormData) => {
	const token = localStorage.getItem("token");
	if (!token) {
		console.error("No JWT token is stored.");
	}
	console.log(JSON.stringify(formData));

	try {
		const response = await fetch(`${BASE_API_URL}/create_employee`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(formData),
		});

		if (!response.ok) {
			throw new Error("Failed to register employee");
		}

		return await response.json();
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};

export default createEmployee;
