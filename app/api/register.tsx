import { useRouter } from "next/navigation";
import { BASE_API_URL } from "./config/api";

export const useRegister = () => {
	const router = useRouter();

	const register = async (
		restaurantname: string,
		email: string,
		password: string
	) => {
		try {
			const response = await fetch(`${BASE_API_URL}/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ restaurantname, email, password }),
			});

			if (response.ok) {
				const data = await response.json();
				console.log("Rejestracja zakończona sukcesem:", data);
				router.push("/pages/userpanel/login");
			} else {
				const errorData = await response.json();
				throw new Error(errorData.error || "Nieznany błąd rejestracji.");
			}
		} catch (error) {
			console.error("Błąd:", error);
			throw error;
		}
	};

	return register;
};
