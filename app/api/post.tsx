interface DataToSend {
	klucz: string;
}

export async function sendDataToBackend(dataToSend: DataToSend): Promise<void> {
	const url = "http://127.0.0.1:5000/static/data";
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(dataToSend),
		});
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const responseData = await response.json();
		console.log("Odpowiedź z backendu:", responseData);
	} catch (error) {
		console.error("Błąd podczas wysyłania danych:", error);
	}
}
