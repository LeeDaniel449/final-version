import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/onboarding") {
    console.log("[v0] Redirecting from /onboarding to /")
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Allow all other requests to proceed
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
