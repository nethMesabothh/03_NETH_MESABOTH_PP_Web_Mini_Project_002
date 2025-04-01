import NextAuth, { CredentialsSignin, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { type NextAuthConfig } from "next-auth";
import { signInService } from "./service/signInService";
import { UserType, UserWithTokenType } from "./types/userType";
import { signInSchema } from "./lib/zod";
import { ZodError } from "zod";

class CustomError extends CredentialsSignin {
	constructor(code: string) {
		super();
		this.code = code;
		this.message = code;
		this.stack = undefined;
	}
}

const authConfig = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				try {
					const { email, password } = await signInSchema.parseAsync(
						credentials
					);
					const user = await signInService({
						credentials: { email, password },
					} as UserType);

					if (!user) {
						throw new CustomError("user_not_found");
					}

					const newUser: UserWithTokenType = {
						email: credentials.email as string,
						password: credentials.password as string,
						token: user.token,
					};

					console.log(newUser);

					return newUser;
				} catch (error: any) {
					if (error instanceof ZodError) {
						throw new CustomError("invalid_schema");
					}
					throw new CustomError(error.message);
				}
			},
		}),
	],
	secret: process.env.AUTH_SECRET,
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/login",
	},
	debug: process.env.NODE_ENV === "development",
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.accessToken = (user as UserWithTokenType).token;
			}

			return token;
		},
		async session({ session, token }) {
			if (token) {
				return { ...session, accessToken: token.accessToken };
			}
			return session;
		},
	},
} as NextAuthConfig);

export const { handlers, signIn, signOut, auth } = authConfig;
