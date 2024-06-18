"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../api/hooks/useAuthToken";
import { useRestaurantName } from "../api/hooks/useRestaurantName";
import { useEmployeeName } from "../api/hooks/useEmployeeName";

const Menu = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const { logoutAction, userType } = useAuth();
	const router = useRouter();
	const token =
		typeof window !== "undefined" ? localStorage.getItem("token") : false;

	const handleClickOutside = (event: MouseEvent) => {
		if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
			setIsMobileMenuOpen(false);
		}
	};

	const { restaurantName } = useRestaurantName(token || "");
	const { employeeName } = useEmployeeName(token || "");

	const handleLogout = () => {
		logoutAction();
		router.push("./pages/userpanel/login");
	};

	return (
		<nav
			ref={menuRef}
			className='bg-gray-800'
		>
			<div className='max-w-7xl px-2 sm:px-6 lg:px-8'>
				<div className='relative flex h-16 items-center justify-between'>
					<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
						<button
							type='button'
							className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
							aria-expanded={isMobileMenuOpen ? "true" : "false"}
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						>
							<span className='sr-only'>Open main menu</span>
							{isMobileMenuOpen ? (
								<svg
									className='block h-6 w-6'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									aria-hidden='true'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M6 18L18 6M6 6l12 12'
									/>
								</svg>
							) : (
								<svg
									className='block h-6 w-6'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									aria-hidden='true'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M4 6h16M4 12h16m-7 6h7'
									/>
								</svg>
							)}
						</button>
					</div>
					<div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
						<div className='flex-shrink-0 flex items-center'>
							<Image
								src='/favicon.ico'
								alt='Your Logo'
								width={40}
								height={40}
							/>
						</div>
						<div className='hidden sm:block sm:ml-6'>
							<div className='flex space-x-4'>
								<Link href='/'>
									<button
										className='bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'
										aria-current='page'
									>
										Strona główna
									</button>
								</Link>
								<Link href='/docs'>
									<button
										className='bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'
										aria-current='page'
									>
										Dokumentacja
									</button>
								</Link>
								{!restaurantName && !employeeName  && (
									<>
										<Link href='/pages/userpanel/register'>
											<button
												className='bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'
												aria-current='page'
											>
												Zarejestruj się
											</button>
										</Link>
										<Link href='/pages/userpanel/login'>
											<button
												className='bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'
												aria-current='page'
											>
												Zaloguj się
											</button>
										</Link>
									</>
								)}
								{userType == "restaurant" && restaurantName && (
									<div className='relative group'>
										<button className='text-white px-3 py-2 rounded-md text-sm font-medium bg-gray-900 cursor-default'>
											{restaurantName}
										</button>
										<div className='absolute bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity'>
											<Link href='/pages/userpanel'>
												<button className='bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer'>
													Panel użytkownika
												</button>
											</Link>
											<button
												onClick={handleLogout}
												className='bg-red-600 mt-2 text-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer'
											>
												Wyloguj Się
											</button>
										</div>
									</div>
								)}
								{userType == "employee" && employeeName && (
									<div className='relative group'>
										<button className='text-white px-3 py-2 rounded-md text-sm font-medium bg-gray-900 cursor-default'>
											{employeeName}
										</button>
										<div className='absolute bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity'>
											<Link href='/pages/userpanel/employeePanel'>
												<button className='bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer'>
													Panel pracownika
												</button>
											</Link>
											<button
												onClick={handleLogout}
												className='bg-red-600 mt-2 text-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer'
											>
												Wyloguj Się
											</button>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			{isMobileMenuOpen && (
				<div
					className='sm:hidden'
					id='mobile-menu'
				>
					<div className='px-2 pt-2 pb-3 space-y-1'>
						<Link
							href='/'
							passHref
						>
							<div className='text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer'>
								Strona główna
							</div>
						</Link>
					</div>
					<div className='px-2 pt-2 pb-3 space-y-1'>
						<Link
							href='/docs'
							passHref
						>
							<div className='text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer'>
								Dokumentacja
							</div>
						</Link>
					</div>
					{!restaurantName && !employeeName && (
						<>
							<div className='px-2 pt-2 pb-3 space-y-1'>
								<Link href='/pages/userpanel/register'>
									<button
										className='text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer'
										aria-current='page'
									>
										Zarejestruj się
									</button>
								</Link>
							</div>
							<div className='px-2 pt-2 pb-3 space-y-1'>
								<Link href='/pages/userpanel/login'>
									<button
										className='text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer'
										aria-current='page'
									>
										Zaloguj się
									</button>
								</Link>
							</div>
						</>
					)}
					{userType == "restaurant" && restaurantName && (
						<div className='relative group px-2 pt-2 pb-3 space-y-1 '>
							<button className='text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer'>
								{restaurantName}
							</button>
							<div className='absolute flex-col bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity'>
								<Link href='/pages/userpanel'>
									<button className='bg-gray-900 m-2 text-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer'>
										Panel użytkownika
									</button>
								</Link>
								<button
									onClick={handleLogout}
									className='bg-red-600 m-2 text-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer'
								>
									Wyloguj Się
								</button>
							</div>
						</div>
					)}
					{userType == "employee" && employeeName && (
						<div className='relative group px-2 pt-2 pb-3 space-y-1 '>
							<button className='text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer'>
								{employeeName}
							</button>
							<div className='absolute flex-col bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity'>
								<Link href='/pages/userpanel/employeePanel'>
									<button className='bg-gray-900 m-2 text-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer'>
										Panel pracownika
									</button>
								</Link>
								<button
									onClick={handleLogout}
									className='bg-red-600 m-2 text-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer'
								>
									Wyloguj Się
								</button>
							</div>
						</div>
					)}
				</div>
			)}
		</nav>
	);
};
export default Menu;
