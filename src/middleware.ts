import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// /idea and /idea/curated are intentionally NOT in the matcher — idea detail pages remain public for top-ideas links.
const PROTECTED_PAGES = ["/dashboard", "/ideas", "/profile", "/analyze"];
const PROTECTED_API_PREFIXES = ["/api/me", "/api/profile", "/api/request-more", "/api/usage"];

function isProtectedPage(pathname: string): boolean {
  return PROTECTED_PAGES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

function isProtectedApi(pathname: string): boolean {
  return PROTECTED_API_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export async function middleware(req: NextRequest) {
  if (process.env.BYPASS_AUTH === "1") {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request: req });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
          response = NextResponse.next({ request: req });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = req.nextUrl.pathname;

  if (user?.email) {
    return response;
  }

  if (isProtectedPage(pathname)) {
    const redirect = new URL("/login", req.url);
    redirect.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirect);
  }

  if (isProtectedApi(pathname)) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  return response;
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
