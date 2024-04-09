"use client";
import Link from "next/link";

export default function Workers() {
	return (
		<>
			<div className='w-1/4 m-3 p-3 rounded border shadow-lg dark:shadow-blue-800 shadow-blue-300'>
				<div className='m-3'>
					<p>Pracownicy</p>
				</div>
				<div className='m-2'>
					<ul>
						<li>Pracownik 1</li>
						<li>Pracownik 2</li>
						<li>Pracownik 3</li>
						<li>Pracownik 4</li>
						<li>Pracownik 5</li>
						<Link
							href={'/pages/userpanel/employeeManagement'}
							className='hover:underline-offset-4'
						>
							...
						</Link>
					</ul>
				</div>
			</div>
		</>
	);
}
