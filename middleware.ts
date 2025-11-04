import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/subscribe(.*)",
  "/activate-premium(.*)",
  "/check-premium(.*)",
  "/api/webhooks(.*)",
  "/api/test-webhook(.*)",
  "/api/activate-my-premium(.*)",
])

export default clerkMiddleware(async (auth, request) => {
  // Allow public routes to pass through without authentication
  if (isPublicRoute(request)) {
    return
  }

  // For protected routes, Clerk will handle authentication automatically
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
