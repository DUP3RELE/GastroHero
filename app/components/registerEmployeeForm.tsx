import { useState, FormEvent } from "react";

interface EmployeeFormData {
	login: string;
	password: string;
	name: string;
	position: string;
}

export default function RegisterEmployeeForm() {
	const [formData, setFormData] = useState<EmployeeFormData>({
		login: "",
		password: "",
		name: "",
		position: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		// Token JWT powinien być dodany do zapytania
		const token = localStorage.getItem("token");

		try {
			const response = await fetch(
				"http://127.0.0.1:5000/api/register_employee",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(formData),
				}
			);

			if (response.ok) {
				// Przetwarzaj odpowiedź, np. wyświetlając komunikat o sukcesie
				console.log("Employee registered successfully");
			} else {
				// Obsługa błędów, np. wyświetlając komunikat o błędzie
				console.error("Failed to register employee");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-4'
		>
			{/* Pola formularza */}
			{/* Implementacja analogiczna do wcześniejszego przykładu */}
		</form>
	);
}
