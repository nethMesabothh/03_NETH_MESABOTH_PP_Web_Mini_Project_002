import { auth } from "@/auth";
import LogoutButtonComponent from "@/components/LogoutButtonComponent";

export default async function Home() {
	const session = await auth();

	console.log(session);

	return (
		<div>
			Hello world
			<LogoutButtonComponent />
		</div>
	);
}
