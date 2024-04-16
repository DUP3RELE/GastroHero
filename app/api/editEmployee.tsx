import { EmployeeFormData } from "./createEmployee";

const editEmployee = async (employeeId: number, formData: EmployeeFormData) => {
	const token = localStorage.getItem("token");
	if (!token) {
		console.error("No JWT token is stored.");
	}

	try {
		const response = await fetch(
			`http://127.0.0.1:5000/api/edit_employee/${employeeId}`,
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
		console.error("Error:", error);
		throw error;
	}
};

export default editEmployee;
