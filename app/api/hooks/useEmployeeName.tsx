import { useState, useEffect } from "react";
import { BASE_API_URL } from "../config/api";

export const useEmployeeName = (token: string | null) => {
	const [employeeName, setEmployeeName] = useState<string>("");
	const [employeePosition, setEmployeePosition] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!token) {
	
			setError("Brak tokenu, użytkownik niezalogowany");
			setLoading(false);
			setEmployeeName("");
			setEmployeePosition("");
			return;
		}
		const fetchEmployeeName = async () => {
			try {
				const response = await fetch(`${BASE_API_URL}/employee_name`, {
					method: "GET",
					headers: { Authorization: `Bearer ${token}` },
				});
				if (response.ok) {
					const data = await response.json();
				
					setEmployeeName(data.employeename);
					setEmployeePosition(data.employeeposition);
					setLoading(false);
				} else {
					throw new Error("Nie udało się pobrać danych");
				}
			} catch (error: any) {
			
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchEmployeeName();
	}, [token]);
	return { employeeName, employeePosition, loading, error };
};
