import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

// Public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/learn(.*)",
  "/portfolio(.*)",
  "/budget(.*)",
  "/mismatch-detector(.*)",
  "/portfolio-optimizer(.*)",
  "/portfolio-implementation(.*)",
  "/api(.*)",
])

export default clerkMiddleware((auth, req) => {
  // Allow all routes for now
  // You can add authentication requirements later by checking !isPublicRoute(req)
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
