import { clerkMiddleware } from "@clerk/nextjs/server"

export default clerkMiddleware({
  publishableKey:
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_YXJ0aXN0aWMtZGVlci0xNS5jbGVyay5hY2NvdW50cy5kZXYk",
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
