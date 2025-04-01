import { NextResponse } from "next/server";
import { auth } from "@/auth";

export const middleware = async (request: Request) => {
	try {
		const session = await auth();
		const url = new URL(request.url);

		if (url.pathname === "/login") {
			return NextResponse.next();
		}

		if (!session) {
			return NextResponse.redirect(new URL("/login", request.url));
		}

		return NextResponse.next();
	} catch (error) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
};

export const config = {
	matcher: ["/book/:path*", "/"],
};
