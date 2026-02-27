import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_PAGES = ["/dashboard", "/ideas", "/idea", "/profile", "/analyze"];
const PROTECTED_API = ["/api/me", "/api/profile", "/api/request-more", "/api/usage"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtectedPage = PROTECTED_PAGES.some((p) => pathname === p || pathname.startsWith(p + "/"));
  const isProtectedApi = PROTECTED_API.some((p) => pathname === p || pathname.startsWith(p + "/"));

  if (!isProtectedPage && !isProtectedApi) return NextResponse.next();

  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            req.cookies.set(name, value);
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    if (isProtectedApi) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return res;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/ideas/:path*",
    "/idea/:path*",
    "/profile/:path*",
    "/analyze/:path*",
    "/api/me/:path*",
    "/api/profile/:path*",
    "/api/request-more/:path*",
    "/api/usage/:path*",
  ],
};
