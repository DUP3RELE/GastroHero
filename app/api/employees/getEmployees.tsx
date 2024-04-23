import { useState, useCallback } from "react";

interface Employee {
	id: number;
	name: string;
	position: string;
}

export const GetEmployees = (accessToken: string, restaurantId: number) => {
	const [employees, setEmployees] = useState<Employee[]>([]);
	const [error, setError] = useState<string | null>(null);

	const fetchEmployees = useCallback(async () => {
		if (!accessToken || !restaurantId) {
			setError("Brak tokenu lub ID restauracji");
			return;
		}

		try {
			const response = await fetch(
				`http://127.0.0.1:5000/api/get_employees?restaurant_id=${restaurantId}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (response.ok) {
				const data: Employee[] = await response.json();
				setEmployees(data);
			} else {
				const errMsg = await response.text();
				throw new Error(`Nie udało się pobrać danych pracowników: ${errMsg}`);
			}
		} catch (error: any) {
			console.error(error.message);
			setError(error.message);
		}
	}, [accessToken, restaurantId]);

	return { employees, fetchEmployees, error };
};
