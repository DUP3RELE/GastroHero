import { useRouter } from "next/navigation";
import { useAuth } from "./hooks/useAuthToken";

interface LoginResponse {
	access_token: string;
	restaurant_id: number;
}

export const useLogin = () => {
	const router = useRouter();
	const { loginAction } = useAuth();

	const login = async (identifier: string, password: string) => {
		try {
			const response = await fetch("http://127.0.0.1:5000/api/login", {
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
				localStorage.setItem("restaurant_id", data.restaurant_id.toString());
				loginAction();
				router.push("../userpanel");
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
