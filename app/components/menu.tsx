"use client";
import React, { useState } from "react";
import Link from "next/link";

const Menu = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className='bg-gray-800 text-white p-4'>
			<div className='flex justify-between items-center'>
				<button
					className='md:hidden'
					onClick={() => setIsOpen(!isOpen)}
				>
					Menu
				</button>
				<ul
					className={`md:flex md:items-center ${isOpen ? "block" : "hidden"}`}
				>
					<li className='m-2'>
						<Link href='/'>
							<button onClick={() => setIsOpen(false)}>Strona główna</button>
						</Link>
					</li>
					<li className='m-2'>
						<Link href='/pages/docs'>
							<button onClick={() => setIsOpen(false)}>Docs</button>
						</Link>
					</li>
					<li className='m-2'>
						<button onClick={() => setIsOpen(false)}>Zarejestruj się</button>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Menu;
