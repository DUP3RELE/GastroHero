import SendDataButton from "./components/sendmethod";

export default function Home() {
	return (
		<>
			<div className='flex-1 p-4'>
				<h1 className='text-xl font-bold'>Strona główna</h1>
				<SendDataButton />
			</div>
		</>
	);
}
