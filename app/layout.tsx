import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./css/globals.css";
import Sidebar from "./components/sidebar";
import Menu from "./components/menu";
import { AuthProvider } from "./api/hooks/useAuthToken";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "GastroHero",
	description: "Manage Your kitchen!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AuthProvider>
			<html>
				<body>
					<main className={`${inter.className} flex flex-col min-h-screen`}>
						<Menu />
						<Sidebar />
						<div className='flex flex-1'>{children}</div>
					</main>
				</body>
			</html>
		</AuthProvider>
	);
}
