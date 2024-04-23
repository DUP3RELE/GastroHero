const deleteEmployee = async (employeeId: number) => {
	const token = localStorage.getItem("token");
	if (!token) {
		console.error("No JWT token is stored.");
	}

	try {
		const response = await fetch(
			`http://127.0.0.1:5000/api/delete_employee/${employeeId}`,
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
		console.error("Error:", error);
		throw error;
	}
};

export default deleteEmployee;
