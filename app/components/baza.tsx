"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRef, useEffect } from "react";

const Menu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
	
	return (
		<nav
			className='bg-gray-800 text-white p-4'
			ref={menuRef}
		>
			<div className='flex'>
				<button
					className='md:hidden'
					onClick={() => setIsOpen(!isOpen)}
				>
					Menu
				</button>
				<div
					className={`${
						isOpen ? "opacity-100" : "opacity-0"
					} md:opacity-100 transition-opacity duration-500 ease-out md:block ${
						isOpen ? "block" : "hidden"
					}`}
				>
					<ul className={`md:flex md:items-center`}>
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
