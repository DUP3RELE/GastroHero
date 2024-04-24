"use client";
import React, { useState, useEffect } from "react";
import {
	createPosition,
	updatePosition,
	deletePosition,
	getPositions,
} from "@/app/api/employees/createPosition";
import Modal from "@/app/components/modal";

interface Position {
	id: number;
	position: string;
	access: string;
}

const PositionEditor: React.FC<{ restaurantId: number }> = ({
	restaurantId,
}) => {
	const [positions, setPositions] = useState<Position[]>([]);
	const [expandedId, setExpandedId] = useState<number | null>(null);
	const [isAdding, setIsAdding] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [newPositionName, setNewPositionName] = useState("");
	const [newPositionAccess, setNewPositionAccess] = useState<string[]>([]);

	const fetchPositions = async () => {
		try {
			const positions = await getPositions(restaurantId);
			setPositions(positions);
			setLoading(false);
		} catch (error) {
			console.error("Error fetching positions:", error);
			setError("Failed to fetch positions.");
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPositions();
	}, [restaurantId]);

	const handleToggleExpand = (positionId: number) => {
		setExpandedId(expandedId === positionId ? null : positionId);
	};

	const handleAddPosition = async () => {
		try {
			await createPosition({
				restaurantId,
				position: newPositionName,
				access: newPositionAccess.join(","),
			});
			setIsAdding(false);
			fetchPositions();
		} catch (error) {
			console.error("Error creating position:", error);
			setError("Failed to create position.");
		}
	};

	const handleEditPosition = async (
		positionId: number,
		newName: string,
		newAccess: string[]
	) => {
		try {
			await updatePosition(
				{ restaurantId, position: newName, access: newAccess.join(",") },
				positionId
			);
			fetchPositions();
		} catch (error) {
			console.error("Error updating position:", error);
			setError("Failed to update position.");
		}
	};

	return (
		<div>
			<button
				onClick={() => setIsAdding(true)}
				className='bg-blue-500 text-white px-4 py-2 rounded'
			>
				Dodaj pozycję
			</button>

			{loading ? (
				<p>Loading positions...</p>
			) : (
				<>
					{positions.length === 0 ? (
						<p>
							Brak pozycji. Dodaj nową, korzystając z przycisku powyżej.
							<button
								onClick={() => setIsAdding(true)}
								className='underline text-blue-500'
							>
								Dodaj pozycję
							</button>
						</p>
					) : (
						positions.map((position) => (
							<div
								key={position.id}
								className='border p-4 rounded mb-2'
							>
								<div className='flex justify-between'>
									<span>{position.position}</span>
									<button
										onClick={() => handleToggleExpand(position.id)}
										className='bg-gray-300 px-2 py-1 rounded'
									>
										{expandedId === position.id ? "Schowaj" : "Edytuj"}
									</button>
								</div>

								{expandedId === position.id && (
									<div className='bg-gray-200 p-2 rounded'>
										<div>
											<label htmlFor={`position-${position.id}-name`}>
												Nazwa:
											</label>
											<input
												type='text'
												id={`position-${position.id}-name`}
												value={position.position}
												onChange={(e) =>
													handleEditPosition(
														position.id,
														e.target.value,
														position.access.split(",")
													)
												}
												className='border p-2 rounded'
											/>
										</div>
										<div>
											<label htmlFor={`position-${position.id}-access`}>
												Dostępy:
											</label>
											<div>
												{["Dostęp 1", "Dostęp 2", "Dostęp 3", "Dostęp 4"].map(
													(accessItem, idx) => (
														<div key={idx}>
															<input
																type='checkbox'
																value={accessItem}
																checked={newPositionAccess.includes(accessItem)}
																onChange={(e) => {
																	const updatedAccess = e.target.checked
																		? [...newPositionAccess, accessItem]
																		: newPositionAccess.filter(
																				(a) => a !== accessItem
																		  );
																	setNewPositionAccess(updatedAccess);
																}}
															/>
															<label>{accessItem}</label>
														</div>
													)
												)}
											</div>
										</div>
									</div>
								)}
							</div>
						))
					)}
				</>
			)}

			{isAdding && (
				<Modal onClose={() => setIsAdding(false)}>
					<h2>Dodaj pozycję</h2>
					<div>
						<label htmlFor='new-position-name'>Nazwa pozycji:</label>
						<input
							type='text'
							id='new-position-name'
							value={newPositionName}
							onChange={(e) => setNewPositionName(e.target.value)}
							className='border p-2 rounded'
						/>
					</div>
					<div>
						<label>Dostępy:</label>
						{["Dostęp 1", "Dostęp 2", "Dostęp 3", "Dostęp 4"].map(
							(accessItem, idx) => (
								<div key={idx}>
									<input
										type='checkbox'
										value={accessItem}
										checked={newPositionAccess.includes(accessItem)}
										onChange={(e) => {
											setNewPositionAccess(
												e.target.checked
													? [...newPositionAccess, accessItem]
													: newPositionAccess.filter((a) => a !== accessItem)
											);
										}}
									/>
									<label>{accessItem}</label>
								</div>
							)
						)}
					</div>
					<button
						onClick={handleAddPosition}
						className='bg-green-500 text-white px-4 py-2 rounded'
					>
						Dodaj
					</button>
					<button
						onClick={() => setIsAdding(false)}
						className='bg-red-500 text-white px-4 py-2 rounded'
					>
						Anuluj
					</button>
				</Modal>
			)}
		</div>
	);
};

export default PositionEditor;
