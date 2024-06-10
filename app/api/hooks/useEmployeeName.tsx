import { useState, useEffect } from "react";

interface EmployeeData {
	employeename: string;
	loading: boolean;
	error: string | null;
}

export const useEmployeeName = (token: string) => {
	const [employeeName, setEmployeeName] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchEmployeeName = async () => {
			if (!token) {
				console.error("Brak tokenu, użytkownik niezalogowany");
				setError("Brak tokenu, użytkownik niezalogowany");
				setLoading(false);
				setEmployeeName("");
				return;
			}

			try {
				const response = await fetch(
					"http://127.0.0.1:5000/api/employee_name",
					{ method: "GET", headers: { Authorization: `Bearer ${token}` } }
				);
				if (response.ok) {
					const data: EmployeeData = await response.json();
					setEmployeeName(data.employeename);
					setLoading(false);
				} else {
					throw new Error("Nie udało się pobrać danych");
				}
			} catch (error: any) {
				console.error(error.message);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchEmployeeName();
	}, [token]);
	return { employeeName, loading, error };
};
