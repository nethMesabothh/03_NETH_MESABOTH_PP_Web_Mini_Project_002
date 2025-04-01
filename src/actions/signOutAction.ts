"use server";
import { signOut } from "@/auth";

export const signOutAction = async () => {
	const signOutUser = await signOut({ redirectTo: "/login" });
};
