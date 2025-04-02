import { Session } from "next-auth";

export interface SessionType extends Session {
	user: { email: string };
	expires: string;
	accessToken: string;
}
