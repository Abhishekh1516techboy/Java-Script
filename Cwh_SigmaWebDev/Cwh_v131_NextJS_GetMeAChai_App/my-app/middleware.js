import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware (request) {
    // Fetch the token using next-auth's utility
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    // If no token is found, redirect to the login page
    if (!token) {
        const url = new URL('/login', request.url); // Create a new URL object
        url.searchParams.set("callbackUrl", request.url); // Include the callback URL for post-login redirection
        return NextResponse.redirect(url); // Redirect to the login page
    }

    // If the token exists, allow the request to proceed
    return NextResponse.next(); // Allow the request to proceed
}

export const config = {
    matcher: ['/contact/:path*', '/dashboard/:path*']
};
