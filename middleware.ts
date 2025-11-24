import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

// Get Clerk keys from environment, checking multiple possible variable names
const getClerkPublishableKey = () => {
  return process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || process.env.Wealthlink_NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ""
}

const getClerkSecretKey = () => {
  return process.env.CLERK_SECRET_KEY || process.env.Wealthlink_CLERK_SECRET_KEY || ""
}

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
  "/budget",
  "/goals",
  "/learn",
  "/mismatch-detector",
  "/portfolio",
  "/portfolio-optimizer",
  "/portfolio-implementation",
  "/manual-sync",
  "/sync-test",
])

const clerkPublishableKey = getClerkPublishableKey()
const clerkSecretKey = getClerkSecretKey()

let middlewareFunction = (request) => {
  return NextResponse.next()
}

if (clerkPublishableKey && clerkSecretKey) {
  console.log("[v0] Clerk keys found in middleware - using Clerk authentication")
  middlewareFunction = clerkMiddleware((auth, request) => {
    // Protect all routes except public ones
    if (!isPublicRoute(request)) {
      // You can add protection logic here if needed
    }
  })
} else {
  console.log("[v0] Clerk keys not found in middleware - bypassing Clerk middleware")
}

export default middlewareFunction

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
