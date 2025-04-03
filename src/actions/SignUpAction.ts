"use server";
import { signUpService } from "@/service/signUpService";
import { AuthError } from "next-auth";

export type SignUpActionState = {
	status: "idle" | "success" | "error";
	message: string;
};

const initialState: SignUpActionState = {
	status: "idle",
	message: "",
};

export const signUpAction = async (
	prevState: SignUpActionState,
	formData: FormData
): Promise<SignUpActionState> => {
	try {
		const credential = {
			username: formData.get("username")?.toString(),
			email: formData.get("email")?.toString(),
			password: formData.get("password")?.toString(),
		};

		const data = await signUpService({ credential });

		if (data.status === "CREATED") {
			return {
				status: "success",
				message: "Account created successfully! Redirecting to login...",
			};
		} else {
			return {
				status: "error",
				message: "Invalid credentials",
			};
		}
	} catch (error) {
		if (error instanceof AuthError) {
			return {
				status: "error",
				message: `Authentication error: ${error.type}`,
			};
		}

		return {
			status: "error",
			message: "An unexpected error occurred",
		};
	}
};
