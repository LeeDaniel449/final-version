import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

// Define public routes that don't require authentication or premium
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/subscribe(.*)",
  "/api/webhooks(.*)",
  "/api/set-premium(.*)",
])

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth()
  const { pathname } = req.nextUrl

  // Redirect /onboarding to home
  if (pathname === "/onboarding") {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // Allow public routes
  if (isPublicRoute(req)) {
    return NextResponse.next()
  }

  if (userId) {
    const metadata = (sessionClaims?.publicMetadata as any) || {}
    console.log("[v0] Middleware - userId:", userId, "metadata:", JSON.stringify(metadata))
    console.log("[v0] Middleware - Granting access to signed-in user")
    return NextResponse.next()
  } else {
    console.log("[v0] Middleware - No user, allowing access to signed-out users")
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
