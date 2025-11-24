import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/user-data(.*)",
  "/manual-sync(.*)",
  "/sync-test(.*)",
])

export default clerkMiddleware(
  (auth, req) => {
    // Protect all routes except public ones
    if (!isPublicRoute(req)) {
      // Routes that need protection can check auth here if needed
      // auth().protect() would enforce authentication
    }
  },
  {
    // Clerk will automatically use NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    // and CLERK_SECRET_KEY from environment variables
    debug: false,
  },
)

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
