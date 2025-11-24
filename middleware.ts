import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

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

export default clerkMiddleware((auth, request) => {
  // Protect all routes except public ones
  if (!isPublicRoute(request)) {
    // You can add protection logic here if needed
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
