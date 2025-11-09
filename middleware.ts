import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const hasClerkKey =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  process.env.Wealthlink_NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  process.env.CLERK_SECRET_KEY

export default async function middleware(req: NextRequest) {
  // If no Clerk key, allow all requests through
  if (!hasClerkKey) {
    return NextResponse.next()
  }

  // Dynamically import Clerk only when configured
  const { clerkMiddleware, createRouteMatcher } = await import("@clerk/nextjs/server")

  const isPublicRoute = createRouteMatcher([
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/webhooks/clerk",
    "/api/test-webhook",
    "/webhook-test",
    "/activate-premium",
  ])

  const clerkHandler = clerkMiddleware(async (auth, request) => {
    if (!isPublicRoute(request)) {
      await auth.protect()
    }
  })

  return clerkHandler(req)
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
