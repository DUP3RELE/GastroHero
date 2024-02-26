"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRef, useEffect } from "react";
import Image from "next/image";

const Menu = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	const handleClickOutside = (event: MouseEvent) => {
		if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
			setIsMobileMenuOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<nav
			ref={menuRef}
			className='bg-gray-800'
		>
			<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
				<div className='relative flex h-16 items-center justify-between'>
					<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
						<button
							type='button'
							className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
							aria-controls='mobile-menu'
							aria-expanded={isMobileMenuOpen ? "true" : "false"}
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						>
							<span className='sr-only'>Open main menu</span>
							{isMobileMenuOpen ? (
								<svg
									className='h-6 w-6'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M6 18L18 6M6 6l12 12'
									/>
								</svg>
							) : (
								<svg
									className='h-6 w-6'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M4 6h16M4 12h16m-7 6h7'
									/>
								</svg>
							)}
						</button>
					</div>
					<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
						<div className='flex flex-shrink-0 items-center'>
							<img
								className='h-8 w-auto'
								src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
								alt='Your Company'
							/>
						</div>
						<div className='hidden sm:ml-6 sm:block'>
							<div className='flex space-x-4'>
								<Link href='/'>
									<button
										className='bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'
										aria-current='page'
									>
										Dashboard
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className={`${isMobileMenuOpen ? "block" : "hidden"} sm:hidden`}
				id='mobile-menu'
			>
				<div className='space-y-1 px-2 pb-3 pt-2'>
					<Link href='/'>
						<button
							className='bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium'
							aria-current='page'
						>
							Dashboard
						</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Menu;
