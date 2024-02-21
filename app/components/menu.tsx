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
				<div className={`${isOpen ? "block" : "hidden"} md:block`}>
					<ul
						className={`md:flex md:items-center ${isOpen ? "block" : "hidden"}`}
					>
						<li className='m-2'>
							<Link href='/'>
								<button onClick={() => setIsOpen(false)}>Strona główna</button>
							</Link>
						</li>
						<li className='m-2'>
							<Link href='/docs'>
								<button onClick={() => setIsOpen(false)}>Docs</button>
							</Link>
						</li>
						<li className='m-2'>
							<Link href='/userpanel/register'>
								<button onClick={() => setIsOpen(false)}>
									Zarejestruj się
								</button>
							</Link>
						</li>
						<li className='m-2'>
							<Link href='/userpanel/login'>
								<button onClick={() => setIsOpen(false)}>Zaloguj się</button>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Menu;
