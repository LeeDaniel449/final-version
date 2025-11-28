import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This avoids the "Missing publishableKey" error in Edge Runtime
export function middleware(request: NextRequest) {
  // Just pass through all requests
  // Clerk authentication is handled client-side via ClerkProvider
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
