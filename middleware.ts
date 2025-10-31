import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)", "/api/webhooks(.*)"])

export default clerkMiddleware(async (auth, request) => {
  const { pathname } = request.nextUrl

  if (pathname === "/onboarding") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Allow public routes without authentication
  if (isPublicRoute(request)) {
    return NextResponse.next()
  }

  // For all other routes, Clerk will handle authentication
  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
