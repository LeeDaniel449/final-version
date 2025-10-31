import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/subscribe(.*)", "/api(.*)"])

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl

  if (pathname === "/onboarding") {
    return NextResponse.redirect(new URL("/", req.url))
  }

  if (isPublicRoute(req)) {
    return NextResponse.next()
  }

  const { userId, sessionClaims } = await auth()

  if (!userId) {
    return NextResponse.next()
  }

  const hasPremium = sessionClaims?.metadata?.premium === true

  console.log("[v0] Middleware - User:", userId, "Premium:", hasPremium)

  if (!hasPremium && pathname !== "/subscribe") {
    return NextResponse.redirect(new URL("/subscribe", req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
