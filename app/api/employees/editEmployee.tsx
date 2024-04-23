interface EmployeePositionData {
	position: string;
}

const editEmployee = async (
	employeeId: number,
	formData: EmployeePositionData
) => {
	const token = localStorage.getItem("token");
	if (!token) {
		console.error("No JWT token is stored.");
		return;
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
		console.error("Error editing employee:", error);
		throw error;
	}
};

export default editEmployee;
