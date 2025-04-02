import { auth } from "@/auth";
import { ProfileType } from "@/types/profileType";
import { SessionType } from "@/types/sessionType";

export const getProfileUser = async () => {
	const session: SessionType = (await auth()) as SessionType;

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/user`,
		{
			headers: {
				Authorization: `Bearer ${session.accessToken}`,
				"Content-Type": "application/json",
			},
		}
	);

	const data: ProfileType = await response.json();
	return data.payload;
};
