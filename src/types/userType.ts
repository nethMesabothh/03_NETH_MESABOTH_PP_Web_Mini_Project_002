import { User } from "next-auth";

export type UserType = {
	credentials: {
		email: string;
		password: string;
	};
};

export interface UserWithTokenType extends User {
	password: string | unknown;
	token: string | unknown;
}
