import { UserResponseType } from "@/types/userResponseType";
import { UserType } from "@/types/userType";

export const signInService = async ({ credentials }: UserType) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/auth/login`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(credentials),
		}
	);

	const data: UserResponseType = await response.json();
	console.log(data);
	return data.payload;
};
