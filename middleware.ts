import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const clerkPublishableKey =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || process.env.Wealthlink_NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
const clerkSecretKey = process.env.CLERK_SECRET_KEY || process.env.Wealthlink_CLERK_SECRET_KEY

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/user-data(.*)",
  "/manual-sync(.*)",
  "/sync-test(.*)",
])

// Middleware function
function middleware(req) {
  // If Clerk keys aren't available, bypass middleware entirely
  if (!clerkPublishableKey || !clerkSecretKey) {
    console.warn("[v0] Clerk keys not available in middleware - sessions will not persist")
    return NextResponse.next()
  }

  // Protect all routes except public ones
  if (!isPublicRoute(req)) {
    // Routes that need protection can check auth here if needed
  }

  // Use Clerk middleware for protected routes
  return clerkMiddleware(req, {
    publishableKey: clerkPublishableKey,
    secretKey: clerkSecretKey,
    debug: true,
  })
}

export default middleware

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
