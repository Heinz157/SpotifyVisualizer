import { getToken} from "next-auth/jwt";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req) {
    // Get the token from the user if logged in 
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    const { pathname } = req.nextUrl;

    // Allow the requests if the following is true
    // 1. Its a request to the next-auth api
    // 2. The token exists

    if (pathname.includes('/api/auth') || token) {
        return NextResponse.continue;
    }

    // If the above is false, then redirect to the login page

    if (!token && pathname !== '/login') {
        return NextResponse.rewrite(new URL('/login', req.url));
    }
}