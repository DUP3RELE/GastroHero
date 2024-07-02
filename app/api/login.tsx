import { useRouter } from "next/navigation";
import { useAuth } from "./hooks/useAuthToken";
import { BASE_API_URL } from "./config/api";

interface LoginResponse {
	access_token: string;
	restaurant_id?: number;
	employee_id?: number;
	userType: "restaurant" | "employee";
}

export const useLogin = () => {
	const router = useRouter();
	const { loginAction } = useAuth();

	const login = async (identifier: string, password: string) => {
		try {
			const response = await fetch(`${BASE_API_URL}/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ identifier, password }),
			});

			if (response.ok) {
				const data: LoginResponse = await response.json();
				console.log("Login successful:", data);

				localStorage.setItem("token", data.access_token);

				if (data.userType === "restaurant") {
					localStorage.setItem("restaurant_id", data.restaurant_id!.toString());
					router.push("../userpanel");
				} else if (data.userType === "employee") {
					localStorage.setItem("employee_id", data.employee_id!.toString());
					router.push("../userpanel/employeePanel");
				}

				loginAction(data.userType);
			} else {
				const errorData = await response.json();
				throw new Error(errorData.message || "Nieznany błąd logowania.");
			}
		} catch (error) {
			console.error("Error:", error);
			throw error;
		}
	};

	return login;
};
