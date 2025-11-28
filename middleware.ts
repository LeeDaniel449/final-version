import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Clerk middleware configuration
// This middleware persists Clerk sessions across page loads
export default async function middleware(request: NextRequest) {
  // Get the Clerk publishable key from environment
  const publishableKey =
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || process.env.Wealthlink_NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  const secretKey = process.env.CLERK_SECRET_KEY || process.env.Wealthlink_CLERK_SECRET_KEY

  // If Clerk keys are available, use Clerk middleware
  if (publishableKey && secretKey) {
    try {
      // Dynamically import clerkMiddleware to avoid build-time errors
      const { clerkMiddleware } = await import("@clerk/nextjs/server")

      // Create and run Clerk middleware with explicit keys
      const clerkMw = clerkMiddleware({
        publishableKey,
        secretKey,
      })

      return clerkMw(request, {} as any)
    } catch (error) {
      console.error("[v0] Clerk middleware error:", error)
      // Fall through to default response if Clerk fails
    }
  }

  // Default: allow request to proceed without Clerk
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
