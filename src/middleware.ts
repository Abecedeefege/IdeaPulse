import { NextResponse, type NextRequest } from "next/server";

// No login gates until email validation is complete. All visits are treated as logged in (see getServerUser in supabase-server).
export async function middleware(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/ideas/:path*",
    "/profile/:path*",
    "/analyze/:path*",
    "/api/me/:path*",
    "/api/profile/:path*",
    "/api/request-more/:path*",
    "/api/usage/:path*",
  ],
};
