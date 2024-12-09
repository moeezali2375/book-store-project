import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { DecodedToken } from "@/app/types/DecodedToken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.next(); // No token, proceed as usual
  }

  try {
    const decoded = jwt.decode(token) as DecodedToken;
    if (!decoded?.user) {
      return NextResponse.redirect(new URL("/", req.url)); // Invalid token
    }

    const { role, isVerified } = decoded.user;
    const currentPath = req.nextUrl.pathname;

    if (currentPath === "/otp" && !isVerified) {
      return NextResponse.next();
    }

    if (currentPath.startsWith("/reader") && role === "reader") {
      return NextResponse.next();
    }

    if (currentPath.startsWith("/writer") && role === "writer") {
      return NextResponse.next();
    }

    if (!isVerified) {
      return NextResponse.redirect(new URL("/otp", req.url));
    }

    if (role === "reader") {
      return NextResponse.redirect(new URL("/reader", req.url));
    } else if (role === "writer") {
      return NextResponse.redirect(new URL("/writer", req.url));
    }

    return NextResponse.redirect(new URL("/", req.url));
  } catch (error) {
    console.error("Error decoding token:", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/", "/reader/:path*", "/writer/:path*", "/otp"],
};
