'use client'
import { sendDataToBackend } from "../api/post";

const SendDataButton: React.FC = () => {
	const handleSubmit = () => {
		const dataToSend = { klucz: "wartość" };
		sendDataToBackend(dataToSend);
	};

	return (
		<div>
			<button onClick={handleSubmit}>Wyślij dane</button>
		</div>
	);
};

export default SendDataButton;
