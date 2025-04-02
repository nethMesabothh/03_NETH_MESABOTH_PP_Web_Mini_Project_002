import Navbar from "@/components/navbar";
import Sidebar from "@/components/side-bar";

export default async function TodoLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex">
			<Sidebar />
			<div className="flex flex-col w-full pr-10">
				<Navbar />
				{children}
			</div>
		</div>
	);
}
