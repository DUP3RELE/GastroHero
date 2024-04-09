import { useRouter } from "next/navigation";

interface LoginResponse {
  access_token: string;
  restaurant_id: number;
}

export const useLogin = () => {
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data: LoginResponse = await response.json();
        console.log("Login successful:", data);
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("restaurant_id", data.restaurant_id.toString());
        router.push("../userpanel");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return login;
};
