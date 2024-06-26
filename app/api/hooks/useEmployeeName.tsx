import { useState, useEffect } from "react";
import { BASE_API_URL } from "../config/api";

interface EmployeeData {
	employeename: string;
	employeeposition: string;
	loading: boolean;
	error: string | null;
}

export const useEmployeeName = (token: string) => {
	const [employeeName, setEmployeeName] = useState<string>("");
	const [employeePosition, setEmployeePosition] = useState<string>("");
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
				const response = await fetch(`${BASE_API_URL}/employee_name`, {
					method: "GET",
					headers: { Authorization: `Bearer ${token}` },
				});
				if (response.ok) {
					const data: EmployeeData = await response.json();
					setEmployeeName(data.employeename);
					setEmployeePosition(data.employeeposition);
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
	return { employeeName, employeePosition, loading, error };
};
