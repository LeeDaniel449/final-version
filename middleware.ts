import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Try to use Clerk middleware dynamically
  try {
    // Check if Clerk keys are available
    const publishableKey =
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || process.env.Wealthlink_NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    const secretKey = process.env.CLERK_SECRET_KEY || process.env.Wealthlink_CLERK_SECRET_KEY

    if (!publishableKey || !secretKey) {
      // Keys not available, just pass through
      return NextResponse.next()
    }

    // Dynamically import and use Clerk middleware
    const { clerkMiddleware } = await import("@clerk/nextjs/server")

    // Create a wrapped handler
    const clerkHandler = clerkMiddleware({
      publishableKey,
      secretKey,
    })

    // Call the Clerk middleware
    return await clerkHandler(request, {
      params: Promise.resolve({}),
    } as any)
  } catch (error) {
    // If Clerk fails for any reason, just pass through
    console.error("[Middleware] Clerk error, passing through:", error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
