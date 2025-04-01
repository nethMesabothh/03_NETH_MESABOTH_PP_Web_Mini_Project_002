// src/components/LogoutButtonComponent.jsx

"use client";
import React from "react";
import { Button } from "./ui/button";
import { signOutAction } from "@/actions/signOutAction";

export default function LogoutButtonComponent() {
	return (
		<form action={signOutAction}>
			{/* just call the sign out function that we have configured in the server action above */}
			<Button className="bg-pink-400 text-base">Log out</Button>
		</form>
	);
}
