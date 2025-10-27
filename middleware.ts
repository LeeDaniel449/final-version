import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

// Routes that require authentication (empty for now to allow preview to work)
const isProtectedRoute = createRouteMatcher([
  // Temporarily disable route protection to fix preview issues
  // Re-enable in production by uncommenting routes below:
  // '/budget(.*)',
  // '/goals(.*)',
  // '/learning(.*)',
  // '/portfolio(.*)',
  // '/ai-advisor(.*)',
])

export default clerkMiddleware((auth, req) => {
  // Only protect specific routes (currently none to allow preview to work)
  if (isProtectedRoute(req)) {
    auth().protect() // Removed await - protect() is synchronous
  }
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
