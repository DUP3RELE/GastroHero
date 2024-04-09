// app/api/register.tsx
import { useRouter } from "next/navigation";

export const useRegister = () => {
  const router = useRouter();

  const register = async (restaurantname: string, email: string, password: string) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/register", {
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
        console.error("Błąd podczas rejestracji");
      }
    } catch (error) {
      console.error("Błąd:", error);
    }
  };

  return register;
};
