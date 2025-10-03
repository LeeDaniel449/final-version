import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"])

export default clerkMiddleware(
  async (auth, request) => {
    if (!isPublicRoute(request)) {
      await auth.protect()
    }
  },
  {
    publishableKey:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_YXJ0aXN0aWMtZGVlci0xNS5jbGVyay5hY2NvdW50cy5kZXYk",
    secretKey: process.env.CLERK_SECRET_KEY,
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
