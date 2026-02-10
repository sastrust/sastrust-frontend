// File: middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DEFAULT_LOCALE = "tr" as const;
const SUPPORTED_LOCALES = ["tr", "en"] as const;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore Next.js internals and static files.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const firstSegment = pathname.split("/")[1];

  // If request already has a supported locale prefix, allow it.
  if (
    SUPPORTED_LOCALES.includes(
      firstSegment as (typeof SUPPORTED_LOCALES)[number]
    )
  ) {
    // Default locale should not be shown in the URL.
    if (firstSegment === DEFAULT_LOCALE) {
      const withoutLocale = pathname.replace(`/${DEFAULT_LOCALE}`, "") || "/";
      return NextResponse.redirect(new URL(withoutLocale, request.url));
    }
    return NextResponse.next();
  }

  // No locale prefix: serve default locale routes directly.
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
