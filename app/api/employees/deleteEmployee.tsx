import { BASE_API_URL } from "../config/api";

const deleteEmployee = async (employeeId: number) => {
	const token = localStorage.getItem("token");
	
	try {
		const response = await fetch(
			`${BASE_API_URL}/delete_employee/${employeeId}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (!response.ok) {
			throw new Error("Failed to delete employee");
		}

		return await response.json();
	} catch (error) {
		throw error;
	}
};

export default deleteEmployee;
