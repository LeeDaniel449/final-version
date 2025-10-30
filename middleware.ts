import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/subscribe(.*)", "/api(.*)"])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()

  if (req.nextUrl.pathname === "/onboarding") {
    console.log("[v0] Redirecting from /onboarding to /")
    return NextResponse.redirect(new URL("/", req.url))
  }

  // Allow public routes
  if (isPublicRoute(req)) {
    return NextResponse.next()
  }

  // If user is not signed in, redirect to sign-up
  if (!userId) {
    console.log("[v0] User not signed in, redirecting to sign-up")
    return NextResponse.redirect(new URL("/sign-up", req.url))
  }

  // User is signed in, allow access (premium check will be done client-side)
  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
