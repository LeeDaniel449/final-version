import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

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

export default clerkMiddleware((auth, request) => {
  // Allow all routes - authentication handled client-side
  // This ensures clerkMiddleware runs but doesn't block any routes
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
