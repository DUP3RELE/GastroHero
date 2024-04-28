import React, { useState } from "react";
import { createPosition } from "../api/employees/createPosition";

type EmployeePositionData = {
	restaurantId: number;
	position: string;
	access: string;
};

const CreatePositionForm = () => {
	const [restaurantId, setRestaurantId] = useState("");
	const [position, setPosition] = useState("");
	const [access, setAccess] = useState("");
	const [error, setError] = useState(null);

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const restaurantIdNum = parseInt(restaurantId, 10);

		const positionData: EmployeePositionData = {
			restaurantId: restaurantIdNum,
			position,
			access,
		};

		try {
			const response = await createPosition(positionData);
			console.log("Position created:", response);

			// Czyści formularz
			setRestaurantId("");
			setPosition("");
			setAccess("");
			setError(null);
		} catch (err: any) {
			setError(err.message);
		}
	};

	return (
		<div>
			<h2>Create New Position</h2>
			<form onSubmit={handleSubmit}>
				{" "}
				<div>
					<label htmlFor='restaurantId'>Restaurant ID:</label>
					<input
						type='text'
						id='restaurantId'
						value={restaurantId}
						onChange={(e) => setRestaurantId(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor='position'>Position:</label>
					<input
						type='text'
						id='position'
						value={position}
						onChange={(e) => setPosition(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor='access'>Access:</label>
					<input
						type='text'
						id='access'
						value={access}
						onChange={(e) => setAccess(e.target.value)}
					/>
				</div>
				{error && <div style={{ color: "red" }}>{error}</div>}{" "}
				<button type='submit'>Create Position</button>
			</form>
		</div>
	);
};

export default CreatePositionForm;
