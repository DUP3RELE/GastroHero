export interface EmployeePositionData {
	restaurantId: number;
	position: string;
	access: string;
}

export const getPositions = async (restaurantId: number) => {
	try {
		const token = localStorage.getItem("token");
		if (!token) {
			console.error("No JWT token is stored.");
			return;
		}

		const response = await fetch(
			`http://127.0.0.1:5000/api/positions?restaurant_id=${restaurantId}`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (!response.ok) {
			throw new Error("Failed to fetch positions");
		}

		return await response.json();
	} catch (error) {
		console.error("Error fetching positions:", error);
		throw error;
	}
};

export const createPosition = async (PositionData: EmployeePositionData) => {
	try {
		const token = localStorage.getItem("token");
		if (!token) {
			console.error("No JWT token is stored.");
		}

		const response = await fetch("http://127.0.0.1:5000/api/positions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(PositionData),
		});
		console.log("data:", PositionData);

		if (!response.ok) {
			throw new Error("Failed to create position");
		}

		return await response.json();
	} catch (error) {
		console.error("Error creating position:", error);
		throw error;
	}
};

export const updatePosition = async (
	PositionData: EmployeePositionData,
	positionId: number
) => {
	try {
		const token = localStorage.getItem("token");

		const response = await fetch(
			`http://127.0.0.1:5000/api/positions/${positionId}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(PositionData),
			}
		);

		if (!response.ok) {
			throw new Error("Failed to update position");
		}

		return await response.json();
	} catch (error) {
		console.error("Error updating position:", error);
		throw error;
	}
};

export const deletePosition = async (positionId: number) => {
	try {
		const token = localStorage.getItem("token");

		const response = await fetch(
			`http://127.0.0.1:5000/api/positions/${positionId}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (!response.ok) {
			throw new Error("Failed to delete position");
		}

		return await response.json();
	} catch (error) {
		console.error("Error deleting position:", error);
		throw error;
	}
};
