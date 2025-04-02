import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";

export const middleware = async (request: NextRequest) => {
	try {
		const res = NextResponse.next();
		const searchParams = request.nextUrl.searchParams.toString();
		res.headers.set("searchParams", searchParams);
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
	matcher: ["/book/:path*", "/", "/todo/:path*"],
};
