"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useEmployeeName } from "@/app/api/hooks/useEmployeeName";
import { useAuth } from "@/app/api/hooks/useAuthToken";

interface EmployeeData {
	employeename: string;
	employeeposition: string;
}
export default function employeePanel() {
	const { isAuthenticated } = useAuth();
	const router = useRouter();
	const token =
		typeof window !== "undefined" ? localStorage.getItem("token") : false;

	const { employeeName, employeePosition } = useEmployeeName(token || "");

	return (
		<>
			<div>
				<h1>Employee Name: {employeeName}</h1>
				<h2>Position: {employeePosition}</h2>
			</div>
		</>
	);
}
