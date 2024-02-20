"use client";
import React, { useState } from "react";

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleSidebar = () => {
		if (window.innerWidth < 768) {
			setIsOpen(!isOpen);
		}
	};

	return (
		<div
			className={`fixed top-0 right-0 h-full bg-gray-800 text-white transition-all duration-300 ease-in-out ${
				isOpen ? "w-64" : "w-16"
			} md:w-64`}
			onClick={toggleSidebar}
		>
			<ul
				className={`absolute ${
					isOpen ? "opacity-100" : "md:opacity-100 opacity-0"
				} transition-opacity duration-500 ease-in-out w-full h-full`}
			>
				<li className='p-4 hover:bg-gray-700 cursor-pointer'>Czat</li>
				<li className='p-4 hover:bg-gray-700 cursor-pointer'>
					Zestawienie operacji
				</li>
				<li className='p-4 hover:bg-gray-700 cursor-pointer'>Pracownicy</li>
				<li className='p-4 hover:bg-gray-700 cursor-pointer'>Statystyki</li>
				<li className='p-4 hover:bg-gray-700 cursor-pointer'>Konto</li>
			</ul>
		</div>
	);
};

export default Sidebar;
