import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const isLoggedIn =
    request.cookies.get("next-auth.session-token")?.value || "";
  const isPublicPath = request.nextUrl.pathname === "/login";

  if (!isLoggedIn && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isLoggedIn && !isPublicPath) {
    return NextResponse.next();
  }
  if (isPublicPath && isLoggedIn) {
    return NextResponse.redirect(new URL("/servers", request.url));
  }
}

export const config = {
  matcher: ["/servers/:path*", "/login","/"],
};
