"use client";
import { useEmployeeName } from "@/app/api/hooks/useEmployeeName";
import RecipiesData from "@/app/components/datablocks/recipies";
import MealData from "@/app/components/datablocks/restaurantData";

export default function employeePanel() {
	const token =
		typeof window !== "undefined" ? localStorage.getItem("token") : false;

	const { employeeName, employeePosition } = useEmployeeName(token || "");

	return (
		<div className='m-2'>
			<div className='m-5'>
				<h1>Witaj, {employeeName}</h1>
				<h2>Twoja pozycja to: {employeePosition}</h2>
			</div>
			<div className='flex w-screen flex-wrap'>
				<RecipiesData />
				<MealData />
			</div>
		</div>
	);
}
