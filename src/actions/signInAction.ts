"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export const signInAction = async (formData: FormData) => {
	try {
		await signIn("credentials", {
			email: formData.get("email"),
			password: formData.get("password"),
			redirectTo: "/todo",
		});
	} catch (error) {
		if (error instanceof AuthError) {
			return redirect(`/login?error=${error.type}`);
		}
		throw error;
	}
};
