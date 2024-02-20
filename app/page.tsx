import Sidebar from "./components/sidebar";
import Menu from "./components/menu";

export default function Home() {
	return (
		<main className='flex flex-col min-h-screen'>
			<Menu />
			<div className='flex flex-1'>
				<Sidebar />
				<div className='flex-1 p-4'>
					<h1 className='text-xl font-bold'>Strona główna</h1>
				</div>
			</div>
		</main>
	);
}
