export interface EmployeeFormData {
	login: string;
	password: string;
	name: string;
	position: string;
}

const createEmployee = async (formData: EmployeeFormData) => {
	const token = localStorage.getItem("token");

	try {
		const response = await fetch("http://127.0.0.1:5000/api/create_employee", {
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
