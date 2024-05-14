"use client";
import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { getPositions } from "../api/employees/createPosition";

interface PositionSelectProps {
	value: string;
	onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PositionSelect: React.FC<PositionSelectProps> = ({ value, onChange }) => {
	const [positions, setPositions] = useState<
		{ id: number; position: string }[]
	>([]);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const restaurantId = localStorage.getItem("restaurant_id");

		if (!restaurantId) {
			setError("Restaurant ID is missing from local storage.");
			setIsLoading(false);
			return;
		}

		const fetchPositions = async () => {
			try {
				const positions = await getPositions(parseInt(restaurantId));
				setPositions(positions);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching positions:", error);
				setError("Failed to fetch positions.");
				setIsLoading(false);
			}
		};

		fetchPositions();
	}, []);

	const positionOptions = useMemo(
		() =>
			positions.map((pos) => (
				<option
					className='text-black'
					key={pos.id}
					value={pos.position}
				>
					{pos.position}
				</option>
			)),
		[positions]
	);

	return (
		<div>
			<select
				name='position'
				value={value}
				onChange={onChange}
				className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black'
			>
				<option
					value=''
					className='text-black'
				>
					- Wybierz opcję -
				</option>
				{positionOptions}
			</select>

			{error ? (
				<p>{error}</p>
			) : positions.length === 0 ? (
				<p className='text-red-500 text-xs'>
					Brak pozycji. Przejdź do edytora, aby stworzyć nową.
					<Link
						href='./editPositions'
						className='underline'
					>
						- Kliknij tutaj, aby dodać nową pozycję. -
					</Link>
				</p>
			) : null}
		</div>
	);
};

export default PositionSelect;
