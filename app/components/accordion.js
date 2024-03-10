"use client";
import { useState } from "react";

const Accordion = ({ title, children }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className='w-full'>
			<button
				className='w-3/4 text-left m-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 text-black'
				onClick={() => setIsOpen(!isOpen)}
			>
				{title}
			</button>
			{isOpen && <div className='px-4 py-2'>{children}</div>}
		</div>
	);
};

export default Accordion;
