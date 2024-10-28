import { BASE_API_URL } from "../config/api";

interface EmployeePositionData {
	position: string;
}

const editEmployee = async (
	employeeId: number,
	formData: EmployeePositionData
) => {
	const token = localStorage.getItem("token");


	try {
		const response = await fetch(
			`${BASE_API_URL}/edit_employee/${employeeId}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(formData),
			}
		);

		if (!response.ok) {
			throw new Error("Failed to update employee");
		}

		return await response.json();
	} catch (error) {
		throw error;
	}
};

export default editEmployee;
