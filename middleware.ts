export default function middleware(request: Request) {
  // Skip Clerk middleware if no publishable key is available
  const hasClerkKey =
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || process.env.Wealthlink_NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  if (!hasClerkKey) {
    // Allow all requests through if Clerk is not configured
    return
  }

  // Use Clerk middleware if key is available
  const { clerkMiddleware, createRouteMatcher } = require("@clerk/nextjs/server")

  const isPublicRoute = createRouteMatcher([
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/webhooks/clerk",
    "/api/test-webhook",
    "/webhook-test",
    "/activate-premium",
  ])

  return clerkMiddleware(async (auth: any, req: any) => {
    if (!isPublicRoute(req)) {
      await auth.protect()
    }
  })(request)
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
