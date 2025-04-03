import { UserType } from "@/types/userType";

type props = {
	credential: {
		username: string | undefined;
		email: string | undefined;
		password: string | undefined;
	};
};

export const signUpService = async ({ credential }: props) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/auth/register`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(credential),
		}
	);

	const data = await response.json();
	return data;
};
