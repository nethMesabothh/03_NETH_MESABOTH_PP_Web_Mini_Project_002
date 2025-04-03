"use client";
import { signUpAction, type SignUpActionState } from "@/actions/SignUpAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, Mail, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

export function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<Button
			type="submit"
			disabled={pending}
			className="text-base cursor-pointer bg-persian-green text-white py-2.5 rounded-lg w-full font-bold"
		>
			{pending ? "Signing Up..." : "Sign Up"}
		</Button>
	);
}

export default function RegisterComponent() {
	const router = useRouter();

	const initialState: SignUpActionState = {
		status: "idle",
		message: "",
	};

	const [state, formAction] = useActionState(signUpAction, initialState);

	useEffect(() => {
		if (state.status === "success") {
			toast("Success!");

			router.push("/login");
		}

		if (state.status === "error") {
			toast("Error!");
		}
	}, [state, toast, router]);

	return (
		<form className="space-y-6" action={formAction}>
			{/* username */}
			<div>
				<Label
					htmlFor="username"
					className="text-light-steel-blue flex gap-2 items-start mb-2 text-base"
				>
					<UserRound size={20} /> Username
				</Label>

				<Input
					id="username"
					name="username"
					type="text"
					placeholder="Please type your username"
					className={`bg-ghost-white py-2.5 px-4 rounded-lg w-full text-light-steel-blue/90`}
					required
				/>
			</div>

			{/* email */}
			<div>
				<Label
					htmlFor="email"
					className="text-light-steel-blue flex gap-2 items-start mb-2 text-base"
				>
					<Mail size={20} /> Email
				</Label>

				<Input
					id="email"
					name="email"
					type="email"
					placeholder="Please type your email"
					className={`bg-ghost-white py-2.5 px-4 rounded-lg w-full text-light-steel-blue/90`}
					required
				/>
			</div>

			{/* password */}
			<div>
				<Label
					htmlFor="password"
					className="text-light-steel-blue flex gap-2 items-start mb-2 text-base"
				>
					<KeyRound size={20} /> Password
				</Label>

				<Input
					id="password"
					name="password"
					type="password"
					placeholder="Please type your password"
					className={`bg-ghost-white py-2.5 px-4 rounded-lg w-full text-light-steel-blue/90`}
					required
				/>
			</div>

			{/* sign in button */}
			<SubmitButton />

			{/* underline */}
			<div>
				<div className="border-b border-b-light-steel-blue"></div>
				<div className="text-center mt-2 font-normal">
					Already have an account?{" "}
					<Link
						href={"/login"}
						className="hover:text-persian-green hover:underline"
					>
						Login
					</Link>
				</div>
			</div>

			{/* sign in with google */}
			<div className="bg-ghost-white rounded-lg text-center">
				<Button className="flex gap-2 items-start justify-center w-full bg-ghost-white text-charcoal shadow-none hover:bg-ghost-white/50">
					<img src="/Google Icon.svg" alt="google icon" /> Sign in with google
				</Button>
			</div>
		</form>
	);
}
