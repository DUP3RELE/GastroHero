"use client";
import { useEffect, useState } from "react";
import {
	getPositions,
	createPosition,
	updatePosition,
	deletePosition,
} from "@/app/api/employees/createPosition";
import Modal from "@/app/components/modal";
interface Position {
	id: number;
	position: string;
	access: string;
}

export default function PositionManagement() {
	const [positions, setPositions] = useState<Position[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [expandedId, setExpandedId] = useState<number | null>(null);
	const [newPosition, setNewPosition] = useState("");
	const [newAccess, setNewAccess] = useState<string[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newPositionName, setNewPositionName] = useState("");
	const [newPositionAccess, setNewPositionAccess] = useState<string[]>([]);

	const token =
		typeof window !== "undefined"
			? window.localStorage.getItem("token")
			: false;
	const restaurant_id = Number(
		typeof window !== "undefined"
			? window.localStorage.getItem("restaurant_id")
			: false
	);

	useEffect(() => {
		fetchPositions();
	}, []);

	const fetchPositions = async () => {
		try {
			const fetchedPositions = await getPositions(restaurant_id);
			setPositions(fetchedPositions);
		} catch (error: any) {
			setError(error.message);
		}
	};

	const handleUpdate = async (positionId: number) => {
		try {
			await updatePosition(
				{ restaurant_id, position: newPosition, access: newAccess.join(",") },
				positionId
			);
			fetchPositions();
			setExpandedId(null);
		} catch (error: any) {
			setError(error.message);
		}
	};

	const handleDelete = async (positionId: number) => {
		try {
			await deletePosition(positionId);
			fetchPositions();
		} catch (error: any) {
			setError(error.message);
		}
	};

	const handleAddPosition = async () => {
		try {
			await createPosition({
				restaurant_id,
				position: newPositionName,
				access: newPositionAccess.join(","),
			});
			fetchPositions();
			setIsModalOpen(false);
			setNewPositionName("");
			setNewPositionAccess([]);
		} catch (error: any) {
			setError(error.message);
		}
	};

	return (
		<div className='w-full p-4'>
			<h1 className='text-xl font-bold mb-4'>Zarządaj pozycjami</h1>
			<button
				className='mb-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none'
				onClick={() => setIsModalOpen(true)}
			>
				Stwórz nową pozycję
			</button>
			{positions.map((position) => (
				<div
					key={position.id}
					className='border rounded-md p-4 my-2 bg-blue-700'
				>
					<div className='flex justify-between'>
						<span>
							{position.position} - Dostęp: {position.access}
						</span>
						<button
							className='py-1 px-3 border rounded-md bg-blue-500 hover:bg-blue-400'
							onClick={() =>
								setExpandedId(expandedId === position.id ? null : position.id)
							}
						>
							Edytuj
						</button>
					</div>
					{expandedId === position.id && (
						<div className='bg-white p-2 rounded mt-2 text-black'>
							<div>
								<label>
									Position:
									<input
										type='text'
										value={newPosition}
										onChange={(e) => setNewPosition(e.target.value)}
										className='ml-2 border-2 border-gray-400 p-1 rounded'
									/>
								</label>
							</div>
							<div>
								<label>Dostęp:</label>
								<div>
									{["Dostęp 1", "Dostęp 2", "Dostęp 3", "Dostęp 4"].map(
										(accessItem, idx) => (
											<div key={idx}>
												<input
													type='checkbox'
													value={accessItem}
													checked={newAccess.includes(accessItem)}
													onChange={(e) => {
														const updatedAccess = e.target.checked
															? [...newAccess, accessItem]
															: newAccess.filter((a) => a !== accessItem);
														setNewAccess(updatedAccess);
													}}
												/>
												{accessItem}
											</div>
										)
									)}
								</div>
							</div>
							<button
								className='mt-2 ml-2 py-1 px-3 border rounded-md bg-blue-500 hover:bg-blue-600 text-white'
								onClick={() => handleUpdate(position.id)}
							>
								Zapisz zmiany
							</button>
							<button
								className='mt-2 ml-2 py-1 px-3 border rounded-md bg-red-500 hover:bg-red-600 text-white'
								onClick={() => handleDelete(position.id)}
							>
								Usuń pozycję
							</button>
						</div>
					)}
				</div>
			))}

			{isModalOpen && (
				<Modal onClose={() => setIsModalOpen(false)}>
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
											const updatedAccess = e.target.checked
												? [...newPositionAccess, accessItem]
												: newPositionAccess.filter((a) => a !== accessItem);
											setNewPositionAccess(updatedAccess);
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
						onClick={() => setIsModalOpen(false)}
						className='bg-red-500 text-white px-4 py-2 rounded'
					>
						Anuluj
					</button>
				</Modal>
			)}
		</div>
	);
}
