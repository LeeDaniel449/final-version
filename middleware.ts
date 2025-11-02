import { createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/subscribe(.*)",
  "/api/webhooks(.*)",
  "/api/test-webhook(.*)",
])

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === "/onboarding") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Allow public routes to pass through
  if (isPublicRoute(request)) {
    return NextResponse.next()
  }

  // For all other routes, let Clerk handle authentication
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
